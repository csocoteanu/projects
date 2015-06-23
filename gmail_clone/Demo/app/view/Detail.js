Ext.define('MVVM.view.Detail', {
    extend : 'Ext.form.Panel',
    xtype  : 'mvvm-DetailView',
    
    requires : [
        //'MVVM.view.DetailViewModel'
    ],
    
    frame   : true,
    padding : 10,
    
    bind : {
        reference : 'MVVM.model.Person',
        title     : '{rec.name}'
    },
    
    viewModel: {
        type: 'detailform'  // references DetailViewModel
    },
    
    items : [
        {
            xtype      : 'textfield',
            bind       : '{rec.name}',
            fieldLabel : 'Name'
        },
		{
            xtype      : 'textfield',
            bind       : '{rec.email}',
            fieldLabel : 'Email'
        },
        {
            xtype      : 'textfield',
            bind       : '{rec.phone}',
            fieldLabel : 'Phone'
        },
        {
            xtype : 'hiddenfield',
            bind  : '{rec.id}'
        },
        {
            xtype  : 'button',
            text   : 'Save',
            itemId : 'SaveRecord'
        }
    ]
});