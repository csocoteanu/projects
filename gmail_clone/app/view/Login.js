Ext.define('GMAIL.view.Login', {
        extend :  'Ext.form.Panel',
        xtype  :  'gmail-Login',

        renderTo: document.body,
        title: 'Login to your account',
        height: 200,
        width: 200,
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email Address',
                    vtype: 'email'  // requires value to be a valid email address format
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Password',
                },
                {
                    xtype:'button',
                    text:'Login',
                    itemId : 'LoginButton'
                }]
});