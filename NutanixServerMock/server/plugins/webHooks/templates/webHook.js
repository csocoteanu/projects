var webHook = {
    "status": {
        "state": "COMPLETE",
        "execution_context": {
            "task_uuids": [
                "5cb54f85-0251-45d9-b335-8e21d99e2fe9"
            ]
        },
        "name": "",
        "resources": {
            "post_url": "",
            "events_filter_list": []
        },
        "description": ""
    },
    "spec": {
        "description": "",
        "resources": {
            "post_url": "",
            "events_filter_list": []
        },
        "name": ""
    },
    "metadata": {
        "owner_reference": {
            "kind": "user",
            "uuid": "00000000-0000-0000-0000-000000000000",
            "name": "admin"
        },
        "kind": "webhook",
        "spec_version": 0,
        "uuid": "",
        "categories": {}
    }
};

exports.newWebHook = function(uuid, name, description, url, eventsList) {

    var newWebHook = JSON.parse(JSON.stringify(webHook));

    newWebHook.status.name = name;
    newWebHook.status.description = description;
    newWebHook.status.resources.post_url = url;
    newWebHook.status.resources.events_filter_list = eventsList;

    newWebHook.spec.name = name;
    newWebHook.spec.description = description;
    newWebHook.spec.resources.post_url = url;
    newWebHook.spec.resources.events_filter_list = eventsList;

    newWebHook.metadata.uuid = uuid;

    return newWebHook;
};