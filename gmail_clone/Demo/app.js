Ext.application({
    name : 'MVVM',
    
    views : [
        'Master',
        'Detail'
    ],
    
    controllers : [
        'Master',
        'Detail'
    ],
    
    stores : [
        'People'
    ],

    launch : function() {
        Ext.create('Ext.container.Viewport', {
            layout : {
                type  : 'hbox',
                align : 'stretch'
            },
            
            items : [
                { 
                    xtype : 'mvvm-MasterView' ,
                    flex  : 2
                },
                { 
                    xtype : 'tabpanel',
                    flex  : 1
                }
            ]
        });
    }
});