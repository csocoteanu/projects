Ext.define('GMAIL.view.EmailView', {
    extend : 'Ext.grid.Panel',
    xtype  : 'gmail-EmailView',
    
    title : 'Emails',
    
    store : 'Emails',
    
    maxHeight:  Ext.getBody().getViewSize().height / 2,
    autoHeight : true,

    columns: [
        { 
            text      : 'Date',  
            dataIndex : 'date',
            width     : 120
        },
        { 
            text      : 'Sender', 
            dataIndex : 'sender', 
            flex      : 1 
        },
        { 
            text      : 'Subject', 
            dataIndex : 'subject', 
            flex      : 1 
        }
    ],

    bind : {
        reference : 'GMAIL.model.Email',
        title     : '{rec.subject}'
    },
    
    viewModel: {
        type: 'detailform'  // references DetailViewModel
    },
});