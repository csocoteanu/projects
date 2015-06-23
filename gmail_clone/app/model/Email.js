Ext.define('GMAIL.model.Email', {
    extend : 'Ext.data.Model',
    
    fields : [
        {
            name : 'date',
            type : 'string'
        },
        {
            name : 'sender',
            type : 'string'
        },
        {
            name : 'subject',
            type : 'string'
        },
        {
            name : 'body',
            type : 'string'
        },
        {
            name : 'read',
            type : 'boolean'
        }
    ]
});