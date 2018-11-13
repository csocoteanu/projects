var EVENT_TYPE_POWER_STATE_CHANGE = 1;
var EVENT_TYPE_VM_DELETE          = 2;
var EVENT_TYPE_VM_UPDATE          = 3;
var EVENT_TYPE_VM_CREATE          = 4;

var eventTypeToTemplate = {};
eventTypeToTemplate[EVENT_TYPE_POWER_STATE_CHANGE] = "./templates/powerStateChanged.js";
eventTypeToTemplate[EVENT_TYPE_VM_DELETE]             = "./templates/deleteVm.js";
eventTypeToTemplate[EVENT_TYPE_VM_UPDATE]          = "./templates/update.js";
eventTypeToTemplate[EVENT_TYPE_VM_CREATE]          = "./templates/createVm.js";
var SEND_EVENTS_DELAY =  300000;

var events = [
    {
        "type": EVENT_TYPE_VM_UPDATE,
        "count": 50
    },
    {
        "type": EVENT_TYPE_POWER_STATE_CHANGE,
        "count": 3
    },
    {
        "type": EVENT_TYPE_VM_DELETE,
        "count": 3
    },
    {
        "type": EVENT_TYPE_VM_CREATE,
        "count": 3
    }
];

function generateEvent (eventType, vm) {

    var template = require(eventTypeToTemplate[eventType]);
    return template.newEvent(vm);
};


exports.generateEvent = generateEvent;
exports.events = events;
exports.EVENT_TYPE_POWER_STATE_CHANGE = EVENT_TYPE_POWER_STATE_CHANGE;
exports.EVENT_TYPE_VM_DELETE             = EVENT_TYPE_VM_DELETE;
exports.EVENT_TYPE_VM_UPDATE          = EVENT_TYPE_VM_UPDATE;
exports.EVENT_TYPE_VM_CREATE          = EVENT_TYPE_VM_CREATE;
exports.SEND_EVENTS_DELAY             = SEND_EVENTS_DELAY;

