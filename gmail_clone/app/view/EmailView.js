Ext.define('GMAIL.view.EmailView', {
    extend : 'Ext.grid.Panel',
    xtype  : 'gmail-EmailView',
    
    title : 'Emails',
    
    store : 'Emails',
    
    maxHeight: 350,
    autoHeight : true,

    columns: [
        { 
            text      : 'Date',  
            dataIndex : 'date',
            flex      : 1
        },
        { 
            text      : 'Sender', 
            dataIndex : 'sender', 
            flex      : 2 
        },
        { 
            text      : 'Subject', 
            dataIndex : 'subject', 
            flex      : 1 
        }
    ]
});