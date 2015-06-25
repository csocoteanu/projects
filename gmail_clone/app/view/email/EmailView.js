Ext.define('GMAIL.view.EmailView', {
    extend : 'Ext.panel.Panel',
    xtype  : 'gmail-EmailView',

    bind : {
        reference : 'GMAIL.model.Email'
    },
    
    viewModel: {
        type: 'emailform'
    },


    layout: {
        type  : 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    items: [
        {
            xtype  : 'grid',
            flex   : 1,
            title  : 'Inbox',
            itemId : 'emailGrid',

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
                }]
        },
        {
            xtype  : 'panel', 
            layout : 'fit',
            itemId : 'senderPanel',
            bind   : { title: 'From: {rec.sender}' }
        },
        {
            xtype  : 'panel',
            layout : 'fit',
            bind   : { title : 'Subject: {rec.subject}' }
        },
        {
            xtype    : 'textareafield',
            flex     : 1,
            layout   : 'fit',
            readOnly : true,
            grow     : true,
            bind     : { value : '{rec.body}' }
        }
    ]
});