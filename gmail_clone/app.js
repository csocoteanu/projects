Ext.application({
    name : 'GMAIL',
    
    views : [
        'Login',
        'EmailView'
    ],
    
    controllers : [
        'Login',
        'Master'
    ],

    stores : [
        'Emails'
    ],

    launch : function() {
        Ext.create('Ext.container.Viewport', {
            fullscreen: true,
            layout: {
                type: 'fit'
            },
            items: [
                {
                    xtype: 'gmail-EmailView'
                }
            ]
        });
    }
});