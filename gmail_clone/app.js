Ext.application({
    name : 'GMAIL',
    
    views : [
        'LoginView',
        'MainView',
        'EmailView',
        'ComposeNewEmailView'
    ],
    
    controllers : [
        'LoginController',
        'MainViewController',
        'EmailViewController',
        'ComposeEmailController'
    ],

    stores : [
        'Emails'
    ],

    launch : function() {
        Ext.create('Ext.container.Viewport', {
            fullscreen : true,

            layout     : 'card',
            itemId     : 'ViewportID',

            items:[
                {
                    xtype: 'gmail-LoginView'
                },
                {
                    xtype: 'gmail-MainView'
                }
            ]
        });
    }
});


