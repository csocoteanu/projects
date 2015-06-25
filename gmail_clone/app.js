Ext.application({
    name : 'GMAIL',
    
    views : [
        'Login',
        'EmailView',
        'AllEmailViews',
        'ComposeEmailView'
    ],
    
    controllers : [
        'Login',
        'Master',
        'AllEmailsController'
    ],

    stores : [
        'Emails'
    ],

    launch : function() {
        Ext.create('Ext.container.Viewport', {
            fullscreen: true,
            layout: 'card',
            itemId: 'ViewportID',
            items: [
                {
                    xtype: 'gmail-Login'
                },
                {
                    xtype: 'gmail-AllEmailViews'
                }
            ]
        });
    }
});


