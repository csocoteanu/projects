var deleteVm = {
    "entity_reference": {
        "kind": "vm",
        "uuid": "682ddd67-6029-4d49-972b-ae3eb5aca956"
    },
    "data": {
        "metadata": {}
    },
    "version": "1.0",
    "event_type": "VM.DELETE"

};

module.exports = {

    newEvent : function(vmInV1Format) {

        var deleteVmEvent = JSON.parse(JSON.stringify(deleteVm));

        deleteVmEvent.entity_reference.uuid = vmInV1Format['uuid'];

        return deleteVmEvent;
    }
};



