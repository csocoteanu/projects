var cluster = {
    "api_version": "3.0",
    "metadata": {
        "total_matches": 1,
        "kind": "cluster"
    },
    "entities": [
        {
            "status": {
                "state": "COMPLETE",
                "name": "Nutanix-Nebula",
                "resources": {
                    "nodes": {
                        "hypervisor_server_list": [
                            {
                                "ip": "10.17.33.12",
                                "version": "el7.nutanix.20180123.170",
                                "type": "AHV"
                            },
                            {
                                "ip": "127.0.0.1",
                                "version": "",
                                "type": "AHV"
                            },
                            {
                                "ip": "10.17.33.11",
                                "version": "el7.nutanix.20180123.170",
                                "type": "AHV"
                            },
                            {
                                "ip": "10.17.33.10",
                                "version": "el7.nutanix.20180123.170",
                                "type": "AHV"
                            }
                        ]
                    },
                    "config": {
                        "software_map": {
                            "NOS": {
                                "status": "INSTALLED",
                                "version": "2018.01.31",
                                "software_type": "NOS"
                            }
                        },
                        "encryption_status": "NOT_SUPPORTED",
                        "service_list": [
                            "AOS"
                        ],
                        "redundancy_factor": 2,
                        "operation_mode": "NORMAL",
                        "is_available": true,
                        "build": {
                            "commit_id": "c3b9964290bf2f28799481fed5cf32f92ab3dadc",
                            "full_version": "el7.3-release-ce-2018.01.31-stable-c3b9964290bf2f28799481fed5cf32f92ab3dadc",
                            "commit_date": "2017-12-18T20:25:53Z",
                            "version": "2018.01.31",
                            "short_commit_id": "c3b996",
                            "build_type": "release"
                        },
                        "timezone": "UTC",
                        "cluster_arch": "X86_64"
                    },
                    "network": {
                        "external_ip": "10.17.33.16",
                        "external_subnet": "10.17.33.0/255.255.255.0",
                        "ntp_server_ip_list": [
                            "0.pool.ntp.org",
                            "1.pool.ntp.org",
                            "ntp.bitdefender.biz"
                        ],
                        "internal_subnet": "192.168.5.0/255.255.255.128",
                        "name_server_ip_list": [
                            "10.17.8.8",
                            "172.23.23.40",
                            "8.8.8.8"
                        ]
                    }
                }
            },
            "spec": {
                "name": "Nutanix-Nebula",
                "resources": {
                    "config": {
                        "timezone": "UTC",
                        "redundancy_factor": 2,
                        "software_map": {
                            "NOS": {
                                "status": "INSTALLED",
                                "version": "2018.01.31",
                                "software_type": "NOS"
                            }
                        },
                        "encryption_status": "NOT_SUPPORTED",
                        "operation_mode": "NORMAL"
                    },
                    "network": {
                        "external_ip": "10.17.33.16",
                        "external_subnet": "10.17.33.0/255.255.255.0",
                        "ntp_server_ip_list": [
                            "0.pool.ntp.org",
                            "1.pool.ntp.org",
                            "ntp.bitdefender.biz"
                        ],
                        "internal_subnet": "192.168.5.0/255.255.255.128",
                        "name_server_ip_list": [
                            "10.17.8.8",
                            "172.23.23.40",
                            "8.8.8.8"
                        ]
                    }
                }
            },
            "metadata": {
                "kind": "cluster",
                "spec_version": 0,
                "uuid": "000567d5-213e-f854-39a7-64006a585477",
                "categories": {}
            }
        }
    ]
};

exports.newCluster = function(clusterName, clusterUuid, clusterIp) {

    var newCluster = JSON.parse(JSON.stringify(cluster.entities[0]));

    newCluster.spec.name = clusterName;
    newCluster.spec.resources.network.external_ip = clusterIp;
    newCluster.status.name = clusterName;
    newCluster.metadata.uuid = clusterUuid;

    return newCluster;
};
