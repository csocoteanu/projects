var utilsModule          = require('../../../../utils/utils.js');

/**
 * Created by iteodorescu on 4/20/2018.
 */

var createNewVm = {

    "entity_reference":{
        "kind":"vm",
        "uuid":"5768903d-f3f3-496a-b6c1-f50c03658120"
    },
    "data":{
        "metadata": {
            "status":{
                "state":"COMPLETE",
                    "description":"test-ioana",
                    "name":"test-ioana",
                    "resources":{
                    "vnuma_config":{
                        "num_vnuma_nodes":0
                    },
                    "nic_list":[
                        {
                            "ip_endpoint_list":[],
                            "nic_type":"NORMAL_NIC",
                            "subnet_reference":{
                                "kind":"subnet",
                                "name":"Network0",
                                "uuid":"358a79e2-f926-438d-880b-83a5428ee15f"
                            },
                            "uuid":"2d3b58ff-970e-42f9-b3a7-8e0f62a1bd05",
                            "mac_address":"50:6b:8d:8a:b2:28"
                        }
                    ],
                    "num_vcpus_per_socket":1,
                    "num_sockets":2,
                    "gpu_list":[

                    ],
                    "memory_size_mib":2048,
                    "power_state":"OFF",
                    "hardware_clock_timezone":"UTC",
                    "power_state_mechanism":{
                        "mechanism":"HARD"
                    },
                    "vga_console_enabled":true,
                        "disk_list":[
                        {
                            "device_properties":{
                                "disk_address":{
                                    "device_index":0,
                                    "adapter_type":"IDE"
                                },
                                "device_type":"CDROM"
                            },
                            "uuid":"427fadab-e153-428a-8977-c0f312cd59a2"
                        }
                    ]
                },
                "cluster_reference": {
                    "kind":"cluster",
                    "name":"Nutanix-Nebula",
                    "uuid":"000567d5-213e-f854-39a7-64006a585477"
                }
            },
            "spec":{
                "description":"test-ioana",
                "name":"test-ioana",
                "resources":{
                    "vnuma_config":{
                        "num_vnuma_nodes":0
                    },
                    "nic_list":[
                        {
                            "ip_endpoint_list":[

                            ],
                            "nic_type":"NORMAL_NIC",
                            "subnet_reference":{
                                "kind":"subnet",
                                "name":"Network0",
                                "uuid":"358a79e2-f926-438d-880b-83a5428ee15f"
                            },
                            "uuid":"2d3b58ff-970e-42f9-b3a7-8e0f62a1bd05",
                            "mac_address":"50:6b:8d:8a:b2:28"
                        }
                    ],
                    "num_vcpus_per_socket":1,
                    "num_sockets":2,
                    "gpu_list":[],
                    "memory_size_mib":2048,
                    "power_state":"OFF",
                    "hardware_clock_timezone":"UTC",
                    "power_state_mechanism":{
                        "mechanism":"HARD"
                    },
                    "vga_console_enabled":true,
                        "disk_list":[
                        {
                            "device_properties":{
                                "disk_address":{
                                    "device_index":0,
                                    "adapter_type":"IDE"
                                },
                                "device_type":"CDROM"
                            },
                            "uuid":"427fadab-e153-428a-8977-c0f312cd59a2"
                        }
                    ]
                },
                "cluster_reference":{
                    "kind":"cluster",
                    "name":"Nutanix-Nebula",
                    "uuid":"000567d5-213e-f854-39a7-64006a585477"
                }
            },
            "api_version":"3.0",
            "metadata": {
                "kind":"vm",
                "spec_version":0,
                "uuid":"5768903d-f3f3-496a-b6c1-f50c03658120",
                "categories":{}
            }
        }
    },
    "version":"1.0",
    "event_type":"VM.CREATE"
}


function generateUuid (){

    return uniqueString();
}

exports.newEvent = function(vmInV1Format) {

    var createNewVmEvent = JSON.parse(JSON.stringify(createNewVm));

    var newName = utilsModule.randomString(5);

    createNewVmEvent.data.metadata.spec.name = newName;
    createNewVmEvent.data.metadata.status.name = newName;

    createNewVmEvent.data.metadata.spec.cluster_reference.uuid = vmInV1Format['clusterUuid'];
    createNewVmEvent.data.metadata.status.cluster_reference.uuid = vmInV1Format['clusterUuid'];

    //createNewVmEvent.data.metadata.status.resources.host_reference.uuid = vmInV1Format['hostUuid'];

    var uuid = utilsModule.randomString(10);
    createNewVmEvent.data.metadata.metadata.uuid = uuid ;
    createNewVmEvent.entity_reference.uuid = uuid;

    return createNewVmEvent;
};