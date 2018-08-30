module.exports = {

    constants: {
        httpErrorCodes: {
            "OK": 200,
            "INVALID_URL": 400,
            "INVALID_REQUEST_TYPE": 401,
            "MALFORMED_REQUEST": 402,
            "FORBIDDEN": 403,
            "CONNECTION_REFUSED": 405,
            "INTERNAL_ERROR": 500,
            "TECHNOLOGY_ERROR": 600
        },

        httpErrorMessages: {
            "OK": "Request OK",
            "INVALID_URL": "Invalid URL",
            "INVALID_REQUEST_TYPE": "Invalid request type",
            "MALFORMED_REQUEST": "Malformed request",
            "FORBIDDEN": "Forbidden",
            "CONNECTION_REFUSED": "Connection refused",
            "INTERNAL_ERROR": "Internal Server Error",
            "TECHNOLOGY_ERROR": "Technology error"
        },

        logging: {
            "level" : {
                "error" : 0,
                "warn"  : 1,
                "info"  : 2,
                "debug" : 3
            }
        },

        statistics: {

        }
    }
};
