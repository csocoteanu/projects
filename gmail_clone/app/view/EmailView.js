Ext.define('GMAIL.view.EmailView', {
    extend : 'Ext.panel.Panel',
    xtype  : 'gmail-EmailView',
    
    bind : {
        reference : 'GMAIL.model.Email'
    },
    
    viewModel: {
        type: 'detailform'  // references DetailViewModel
    },


    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    items: [
        {
            xtype  : 'panel', 
            flex   : 1,
            title  : 'Inbox',
            itemId : 'emailPanel',

            items: [{
                xtype  : 'grid',
                store  : 'Emails',
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
                }]
        },
        {
            xtype : 'panel', 
            flex  : 1,
            layout : 'fit',

            bind : { title: 'From: {rec.sender}' },

            items: [{
                xtype  : 'panel',
                flex   : 1,
                layout : 'fit',

                bind   : { title : 'Subject: {rec.subject}' },
                items  : [{
                    xtype    : 'textareafield',
                    readOnly : true,
                    grow     : true,

                    bind  : { value : '{rec.body}' }
                }]
            }]
        }
    ]
});