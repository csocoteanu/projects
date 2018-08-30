var utilsModule          = require('../../../../utils/utils.js');

/**
 * Created by msofron on 4/18/2018.
 */
var vmUpdated = {

    "entity_reference":{
        "kind":"vm",
        "uuid":"31371713-5310-4dc7-8bc8-e006d35f86ea"
    },
    "data":{
        "metadata":{
            "status": {
                "description": "ioana",
                "state": "COMPLETE",
                "cluster_reference": {
                    "kind": "cluster",
                    "uuid": "000567d5-213e-f854-39a7-64006a585477",
                    "name": "Nutanix-Nebula"
                },
                "resources": {
                    "vnuma_config": {
                        "num_vnuma_nodes": 0
                    },
                    "nic_list": [],
                    "host_reference": {
                        "kind": "host",
                        "uuid": "22168d5c-fca2-47da-9147-4f1ca43059f0",
                        "name": "10.17.33.14"
                    },
                    "num_vcpus_per_socket": 1,
                    "num_sockets": 1,
                    "gpu_list": [],
                    "memory_size_mib": 2048,
                    "power_state": "ON",
                    "hardware_clock_timezone": "UTC",
                    "power_state_mechanism": {
                        "mechanism": "HARD"
                    },
                    "vga_console_enabled": true,
                    "disk_list": [
                        {
                            "device_properties": {
                                "disk_address": {
                                    "device_index": 0,
                                    "adapter_type": "IDE"
                                },
                                "device_type": "CDROM"
                            },
                            "uuid": "f30075a1-7032-4b6c-86e8-68386ab6a199"
                        }
                    ]
                },
                "name": "ioana"
            },
            "spec": {
                "cluster_reference": {
                    "kind": "cluster",
                    "name": "Nutanix-Nebula",
                    "uuid": "000567d5-213e-f854-39a7-64006a585477"
                },
                "description": "ioana",
                "resources": {
                    "vnuma_config": {
                        "num_vnuma_nodes": 0
                    },
                    "nic_list": [],
                    "num_vcpus_per_socket": 1,
                    "num_sockets": 1,
                    "gpu_list": [],
                    "memory_size_mib": 2048,
                    "power_state": "ON",
                    "hardware_clock_timezone": "UTC",
                    "power_state_mechanism": {
                        "mechanism": "HARD"
                    },
                    "vga_console_enabled": true,
                    "disk_list": [
                        {
                            "device_properties": {
                                "disk_address": {
                                    "device_index": 0,
                                    "adapter_type": "IDE"
                                },
                                "device_type": "CDROM"
                            },
                            "uuid": "f30075a1-7032-4b6c-86e8-68386ab6a199"
                        }
                    ]
                },
                "name": "ioana"
            },
            "metadata": {
                "kind": "vm",
                "spec_version": 0,
                "uuid": "31371713-5310-4dc7-8bc8-e006d35f86ea",
                "categories": {}
            }
        }
    },
    "version":"1.0",
    "event_type":"VM.UPDATE"
};


exports.newEvent = function(vmInV1Format) {

    var newPowerStateChangedEvent = JSON.parse(JSON.stringify(vmUpdated));

    newPowerStateChangedEvent.data.metadata.spec.cluster_reference.uuid = vmInV1Format['clusterUuid'];
    newPowerStateChangedEvent.data.metadata.status.cluster_reference.uuid = vmInV1Format['clusterUuid'];

    newPowerStateChangedEvent.data.metadata.status.resources.host_reference.uuid = vmInV1Format['hostUuid'];

    newPowerStateChangedEvent.data.metadata.metadata.uuid = vmInV1Format['uuid'];
    newPowerStateChangedEvent.entity_reference.uuid = vmInV1Format['uuid'];

    var newName = vmInV1Format['vmName'] + '-' + utilsModule.randomString(5);

    vmInV1Format['vmName'] = newName;

    newPowerStateChangedEvent.data.metadata.spec.name = newName;
    newPowerStateChangedEvent.data.metadata.status.name = newName;

    return newPowerStateChangedEvent;
};