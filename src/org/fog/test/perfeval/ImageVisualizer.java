package org.fog.test.perfeval;

import java.util.ArrayList;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.io.File;
import java.awt.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import javax.swing.*;

import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.power.PowerHost;
import org.cloudbus.cloudsim.provisioners.*;
import org.cloudbus.cloudsim.sdn.overbooking.*;

import org.fog.application.*;
import org.fog.application.selectivity.FractionalSelectivity;
import org.fog.entities.*;
import org.fog.placement.*;
import org.fog.policy.AppModuleAllocationPolicy;
import org.fog.scheduler.StreamOperatorScheduler;
import org.fog.utils.*;
import org.fog.utils.distribution.DeterministicDistribution;

/* ---------------- NODE ---------------- */
class Node_1 {
    String name;
    int load;
    Node_1(String n, int l){
        name = n;
        load = l;
    }
}

/* ---------------- MAIN CLASS ---------------- */
public class ImageVisualizer {

    static List<FogDevice> fogDevices = new ArrayList<>();
    static List<Sensor> sensors = new ArrayList<>();
    static List<Actuator> actuators = new ArrayList<>();

    static int numOfCamerasPerArea = 4;
    static double CAM_TRANSMISSION_TIME = 30;

    public static void main(String[] args) {

        System.out.println("Starting Smart Parking with GWO + LIVE Dashboard...");

        try {
            Log.disable();
            CloudSim.init(1, Calendar.getInstance(), false);

            FogBroker broker = new FogBroker("broker");
            String appId = "smart-parking-gwo";

            Application app = createApplication(appId, broker.getId());
            app.setUserId(broker.getId());

            createFogDevices(broker.getId(), appId);

            /* ----------- GWO ----------- */
            GreyWolfOptimizer gwo = new GreyWolfOptimizer(6, 40, 2, fogDevices.size());

            int[] bestPlacement = gwo.optimize(solution -> {

                double cost = 0;
                FogDevice pic = fogDevices.get(solution[0]);
                FogDevice slot = fogDevices.get(solution[1]);

                if(pic.getName().startsWith("c-")) cost += 1000;
                if(slot.getName().startsWith("c-")) cost += 1000;

                if(pic.getName().equals("cloud")) cost += 500;
                if(slot.getName().equals("cloud")) cost += 500;

                cost += pic.getUplinkLatency()*5;
                cost += slot.getUplinkLatency()*5;

                return cost;
            });

            /* ----------- SAFE FIX ----------- */
            for(int i=0;i<bestPlacement.length;i++){
                if(fogDevices.get(bestPlacement[i]).getName().startsWith("c-")){
                    bestPlacement[i] = findDevice("a-0");
                }
            }

            String picDevice = fogDevices.get(bestPlacement[0]).getName();
            String slotDevice = fogDevices.get(bestPlacement[1]).getName();

            ModuleMapping mapping = ModuleMapping.createModuleMapping();
            mapping.addModuleToDevice("picture-capture", picDevice);
            mapping.addModuleToDevice("slot-detector", slotDevice);

            System.out.println("\n=== FINAL PLACEMENT ===");
            System.out.println("Picture Module → " + picDevice);
            System.out.println("Slot Module → " + slotDevice);

            /* ----------- LOAD BALANCING ----------- */
            List<Node_1> nodes = new ArrayList<>();
            Map<String,Integer> loadMap = new HashMap<>();

            for(FogDevice d: fogDevices)
                loadMap.put(d.getName(),0);

            loadMap.put(picDevice, loadMap.get(picDevice)+1);
            loadMap.put(slotDevice, loadMap.get(slotDevice)+1);

            for(FogDevice d: fogDevices)
                nodes.add(new Node_1(d.getName(), loadMap.get(d.getName())));

            System.out.println("\n[Before LB]");
            for(Node_1 n:nodes)
                System.out.println(n.name+" : "+n.load);

            int threshold = 1;

            for(Node_1 s:nodes){
                if(s.load > threshold){
                    for(Node_1 r:nodes){
                        if(r!=s && r.load<threshold && !r.name.equals("cloud")){
                            s.load -= 1;
                            r.load += 1;
                            System.out.println("[LB] "+s.name+" → "+r.name);
                            break;
                        }
                    }
                }
            }

            System.out.println("\n[After LB]");
            for(Node_1 n:nodes)
                System.out.println(n.name+" : "+n.load);

            /* ----------- DASHBOARD ----------- */
            new Thread(() -> ImageUtils.displayDashboard(nodes)).start();

            /* ----------- SIMULATION ----------- */
            Controller controller = new Controller("controller", fogDevices, sensors, actuators);
            controller.submitApplication(app, new ModulePlacementMapping(fogDevices, app, mapping));

            CloudSim.startSimulation();
            CloudSim.stopSimulation();

            System.out.println("\nSimulation Completed!");

            // 🔥 KEEP WINDOW ALIVE
            while(true) {
            	Thread.sleep(1000);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static int findDevice(String name){
        for(int i=0;i<fogDevices.size();i++)
            if(fogDevices.get(i).getName().equals(name))
                return i;
        return 0;
    }

    private static Application createApplication(String appId, int userId) {

        Application app = Application.createApplication(appId, userId);

        app.addAppModule("picture-capture", 3000);
        app.addAppModule("slot-detector", 4000);

        app.addAppEdge("CAMERA","picture-capture",400,120,"CAMERA",Tuple.UP,AppEdge.SENSOR);
        app.addAppEdge("picture-capture","slot-detector",800,500,"SLOTS",Tuple.UP,AppEdge.MODULE);
        app.addAppEdge("slot-detector","PTZ_CONTROL",100,50,"PTZ_PARAMS",Tuple.DOWN,AppEdge.ACTUATOR);

        app.addTupleMapping("picture-capture","CAMERA","SLOTS",new FractionalSelectivity(1.0));
        app.addTupleMapping("slot-detector","SLOTS","PTZ_PARAMS",new FractionalSelectivity(1.0));

        app.setLoops(Collections.singletonList(
                new AppLoop(Arrays.asList("CAMERA","picture-capture","slot-detector","PTZ_CONTROL"))
        ));

        return app;
    }

    private static void createFogDevices(int userId, String appId) {

        FogDevice cloud = createFogDevice("cloud",44800,40000,100,10000,0);
        fogDevices.add(cloud);

        FogDevice proxy = createFogDevice("proxy-server",6000,8000,10000,10000,1);
        proxy.setParentId(cloud.getId());
        proxy.setUplinkLatency(30);
        fogDevices.add(proxy);

        FogDevice router = createFogDevice("a-0",12000,16000,1000,10000,2);
        router.setParentId(proxy.getId());
        router.setUplinkLatency(15);
        fogDevices.add(router);

        for(int i=0;i<numOfCamerasPerArea;i++){

            FogDevice cam = createFogDevice("c-0-"+i,500,1000,10000,10000,3);
            cam.setParentId(router.getId());
            cam.setUplinkLatency(5);
            fogDevices.add(cam);

            Sensor s = new Sensor("s-"+i,"CAMERA",userId,appId,
                    new DeterministicDistribution(CAM_TRANSMISSION_TIME));
            s.setGatewayDeviceId(cam.getId());
            sensors.add(s);

            Actuator a = new Actuator("ptz-"+i,userId,appId,"PTZ_CONTROL");
            a.setGatewayDeviceId(router.getId());
            actuators.add(a);
        }
    }

    private static FogDevice createFogDevice(String name,long mips,int ram,long upBw,long downBw,int level){

        List<Pe> peList = new ArrayList<>();
        peList.add(new Pe(0,new PeProvisionerOverbooking(mips)));

        PowerHost host = new PowerHost(FogUtils.generateEntityId(),
                new RamProvisionerSimple(ram),
                new BwProvisionerOverbooking(10000),
                1000000,
                peList,
                new StreamOperatorScheduler(peList),
                new FogLinearPowerModel(100,50));

        FogDevice device=null;

        try{
            device = new FogDevice(name,
                    new FogDeviceCharacteristics("x86","Linux","Xen",host,10,3,0.05,0.001,0),
                    new AppModuleAllocationPolicy(Collections.singletonList(host)),
                    new LinkedList<>(),10,upBw,downBw,0,0);
        }catch(Exception e){}

        device.setLevel(level);
        return device;
    }

    /* ---------------- IMAGE + DASHBOARD ---------------- */
    static class ImageUtils {

        public static BufferedImage loadCameraImage(String name){
            try{
                File dir = new File("dataset/");
                File[] files = dir.listFiles();
                if(files == null) return null;

                for(File f:files){
                    if(f.getName().toLowerCase().contains(name.toLowerCase()))
                        return ImageIO.read(f);
                }
            }catch(Exception e){}
            return null;
        }

        public static BufferedImage annotateImage(BufferedImage img,int load){

            BufferedImage out = new BufferedImage(img.getWidth(),img.getHeight(),img.getType());
            Graphics2D g = out.createGraphics();

            g.drawImage(img,0,0,null);

            if(load==0) g.setColor(Color.GREEN);
            else if(load==1) g.setColor(Color.ORANGE);
            else g.setColor(Color.RED);

            g.setFont(new Font("Arial",Font.BOLD,24));
            g.drawString("Load: "+load,10,30);

            g.dispose();
            return out;
        }

        public static void displayDashboard(List<Node_1> nodes){
        	System.setProperty("java.awt.headless", "false");
        	
        	SwingUtilities.invokeLater(() -> {
        		JFrame frame = new JFrame("SMART PARKING DASHBOARD");
        		frame.setSize(900,700);
        		frame.setLayout(new GridLayout(2,2));
        		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        		
        		List<JLabel> labels = new ArrayList<>();
        		
        		for(Node_1 n: nodes) {
        			if(n.name.startsWith("c-")) {
        				JLabel label = new JLabel("Loading...", JLabel.CENTER);
        				label.setVerticalTextPosition(JLabel.BOTTOM);
        				label.setHorizontalTextPosition(JLabel.CENTER);
        				labels.add(label);
        				frame.add(label);
        			}
        		}
        		frame.setVisible(true);
        		frame.repaint();
        		frame.validate();
        		
        		new javax.swing.Timer(1000, e -> {
        			int i = 0;
        			for(Node_1 n : nodes) {
        				if(n.name.startsWith("c-")) {
        					BufferedImage img = loadCameraImage(n.name);
        					if(img != null) {
        						BufferedImage a = annotateImage(img, n.load);
        						ImageIcon icon = new ImageIcon(
        									a.getScaledInstance(300,200,Image.SCALE_SMOOTH));
        							
        							labels.get(i).setIcon(icon);
        							labels.get(i).setText(n.name + " | Load: " + n.load);
        						} else {
        							labels.get(i).setText("No Image: " + n.name);
        						}
        						i++;
        					}
        				}
        			}).start();
        		});
        }
    }
        	
    /* ---------------- GWO ---------------- */
    static class GreyWolfOptimizer {

        int agents,iter,modules,devices;
        Random r = new Random();

        GreyWolfOptimizer(int a,int i,int m,int d){
            agents=a; iter=i; modules=m; devices=d;
        }

        int[] optimize(FitnessFunction f){

            int[][] wolves = new int[agents][modules];
            double bestScore = Double.MAX_VALUE;
            int[] best = new int[modules];

            for(int i=0;i<agents;i++){
                for(int j=0;j<modules;j++)
                    wolves[i][j]=r.nextInt(devices);

                double score = f.evaluate(wolves[i]);

                if(score<bestScore){
                    bestScore=score;
                    best=wolves[i].clone();
                }
            }

            for(int t=0;t<iter;t++){
                for(int i=0;i<agents;i++){

                    for(int j=0;j<modules;j++){
                        wolves[i][j]=Math.max(0,Math.min(devices-1,
                                best[j]+r.nextInt(3)-1));
                    }

                    double score = f.evaluate(wolves[i]);

                    if(score<bestScore){
                        bestScore=score;
                        best=wolves[i].clone();
                    }
                }
            }
            return best;
        }

        interface FitnessFunction{
            double evaluate(int[] s);
        }
    }
}