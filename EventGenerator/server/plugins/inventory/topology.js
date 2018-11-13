exports.topology ={

    clusters: {
        count: 1,
        name: "My-Cluster",
        hosts: {
            name: "My-Host",
            count: 3,
            vms: {
                name: "My-VM",
                count: 20000
            }
        }
    }
};
