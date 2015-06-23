Ext.define('GMAIL.view.EmailBodyViewer', {
    extend : 'Ext.form.Panel',
    xtype  : 'gmail-EmailBodyViewer',
    
    bind : {
        reference : 'GMAIL.model.Email',
        title     : '{rec.subject}'
    },
    
    viewModel: {
        type: 'detailform'  // references DetailViewModel
    },

    items: [
        {
            xtype      : 'textfield',
            bind       : '{rec.data.sender}',
            fieldLabel : 'Email'
        },
        {
            xtype     : 'textareafield',
            grow      : true,
            name      : 'message',
            readOnly  : true,
            anchor    : '100%',
            bind      : '{rec.data.body}'
        }   
    ]

});