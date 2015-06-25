Ext.define('GMAIL.view.LoginView', {
        extend      :  'Ext.form.Panel',
        xtype       :  'gmail-LoginView',

        defaultType : 'textfield',
        title       : 'Login to your account',
        height      : 200,
        width       : 200,
        bodyPadding : 10,

        items: [
            {
                xtype      :'textfield',
                name       :'email',
                fieldLabel :'Email Address',
                vtype      :'email'
            },
            {
                xtype      :'textfield',
                name       :'password',
                inputType  :'password',
                fieldLabel :'Password',
            },
            {
                xtype      :'button',
                text       :'Login',
                itemId     :'loginButton'
            }
        ]
});