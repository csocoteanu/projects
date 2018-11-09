exports.config = {

    redis: {
        master_name : "mymaster",
        sentinels    : [
            {
                host: '192.168.33.10',
                port: 26379
            },
            {
                host: '192.168.33.10',
                port: 36379
            }
        ]
    }
};
