Ext.define('GMAIL.view.ComposeNewEmailView', {
    extend : 'Ext.panel.Panel',
    xtype  : 'gmail-ComposeNewEmailView',

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
            xtype      : 'textfield', 
            fieldLabel : 'To ',
            allowBlank : false,
            vtype      : 'email',
            bind       : { value : '{rec.sender}' }
        },
        {
            xtype      : 'textfield', 
            fieldLabel : 'Subject ',
            allowBlank : false,
            bind       : { value : '{rec.subject}' }
        },
        {
            xtype    : 'textareafield',
            flex     : 1,
            layout   : 'fit',            
            grow     : true,
            bind     : { value : '{rec.body}' }
        },
        {
            xtype : 'panel',
            items : [
                {
                    xtype  :'button',
                    text   :'Send Email',
                    align  :'left',
                    itemId :'sendButton'
                }
            ]
        }
    ]
});