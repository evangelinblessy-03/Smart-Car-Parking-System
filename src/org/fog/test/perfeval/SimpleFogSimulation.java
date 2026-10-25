package org.fog.test.perfeval;

import java.util.*;

import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.power.PowerHost;
import org.cloudbus.cloudsim.provisioners.BwProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.PeProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.RamProvisionerSimple;

import org.fog.application.*;
import org.fog.application.selectivity.FractionalSelectivity;
import org.fog.entities.*;
import org.fog.placement.*;
import org.fog.policy.AppModuleAllocationPolicy;
import org.fog.scheduler.StreamOperatorScheduler;
import org.fog.utils.*;
import org.fog.utils.distribution.DeterministicDistribution;

public class SimpleFogSimulation {

    static List<FogDevice> fogDevices = new ArrayList<>();
    static List<Sensor> sensors = new ArrayList<>();
    static List<Actuator> actuators = new ArrayList<>();

    public static void main(String[] args) {

        System.out.println("Starting Simple iFogSim Simulation...");

        try {
            int numUsers = 1;
            Calendar calendar = Calendar.getInstance();
            boolean traceFlag = false;

            CloudSim.init(numUsers, calendar, traceFlag);

            FogDevice cloud = createFogDevice(
                    "cloud", 
                    44800, 40000, 100, 10000, 
                    0, 0.01, 16 * 103, 16 * 83.25
            );
            cloud.setParentId(-1);
            fogDevices.add(cloud);

            FogDevice fogNode = createFogDevice(
                    "fog-node", 
                    2800, 4000, 100, 10000, 
                    1, 0.0, 107.339, 83.4333
            );
            fogNode.setParentId(cloud.getId());
            fogNode.setUplinkLatency(100);
            fogDevices.add(fogNode);

            Application application = createApplication("simple_app", 1);

            Sensor sensor = new Sensor(
                    "sensor-1", 
                    "SENSOR", 
                    1, 
                    "simple_app", 
                    new DeterministicDistribution(5)
            );
            sensor.setGatewayDeviceId(fogNode.getId());
            sensor.setLatency(1.0);
            sensors.add(sensor);

            Actuator actuator = new Actuator(
                    "actuator-1", 
                    1, 
                    "simple_app", 
                    "DISPLAY"
            );
            actuator.setGatewayDeviceId(fogNode.getId());
            actuator.setLatency(1.0);
            actuators.add(actuator);

            ModuleMapping moduleMapping = ModuleMapping.createModuleMapping();
            moduleMapping.addModuleToDevice("processing", "fog-node");

            Controller controller = new Controller(
                    "controller", 
                    fogDevices, 
                    sensors, 
                    actuators
            );

            controller.submitApplication(
                    application,
                    new ModulePlacementMapping(fogDevices, application, moduleMapping)
            );

            CloudSim.startSimulation();
            CloudSim.stopSimulation();

            System.out.println("Simulation finished!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Application createApplication(String appId, int userId) {

        Application application = Application.createApplication(appId, userId);

        application.addAppModule("processing", 10);

        application.addAppEdge(
                "SENSOR",
                "processing",
                3000,
                500,
                "SENSOR",
                Tuple.UP,
                AppEdge.SENSOR
        );

        application.addAppEdge(
                "processing",
                "DISPLAY",
                1000,
                500,
                "DISPLAY",
                Tuple.DOWN,
                AppEdge.ACTUATOR
        );

        application.addTupleMapping(
                "processing",
                "SENSOR",
                "DISPLAY",
                new FractionalSelectivity(1.0)
        );
        
        List<String> loopList = new ArrayList<>();
        loopList.add("SENSOR");
        loopList.add("processing");
        loopList.add("DISPLAY");
        
        application.setLoops(Arrays.asList(new AppLoop(loopList)));
        return application;
    }

    private static FogDevice createFogDevice(
            String nodeName,
            long mips,
            int ram,
            long upBw,
            long downBw,
            int level,
            double ratePerMips,
            double busyPower,
            double idlePower
    ) {

        List<Pe> peList = new ArrayList<>();
        peList.add(new Pe(0, new PeProvisionerSimple(mips)));

        int hostId = FogUtils.generateEntityId();
        long storage = 1000000;
        int bw = 10000;

        PowerHost host = new PowerHost(
                hostId,
                new RamProvisionerSimple(ram),
                new BwProvisionerSimple(bw),
                storage,
                peList,
                new StreamOperatorScheduler(peList),
                new FogLinearPowerModel(busyPower, idlePower)
        );

        List<Host> hostList = new ArrayList<>();
        hostList.add(host);

        FogDeviceCharacteristics characteristics = new FogDeviceCharacteristics(
                "x86",
                "Linux",
                "Xen",
                host,
                10.0,
                3.0,
                0.05,
                0.001,
                0.0
        );

        FogDevice fogDevice = null;

        try {
            fogDevice = new FogDevice(
                    nodeName,
                    characteristics,
                    new AppModuleAllocationPolicy(hostList),
                    new LinkedList<Storage>(),
                    10,
                    upBw,
                    downBw,
                    0,
                    ratePerMips
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        fogDevice.setLevel(level);
        return fogDevice;
    }
}
