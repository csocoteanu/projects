Ext.onReady(function() {
    var loginForm = Ext.create('Ext.form.Panel', {
        url: '/',
        renderTo: document.body,
        title: 'Login to your account',
        height: 140,
        width: 640,
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
                }],
         buttons: [{
                    text: 'Login',
                    handler: function(){ onLoginClick(loginForm); }
                }]
    });
/*
    var txt_email = Ext.get('tbEmail');
    var txt_password = Ext.get('tbPassword');
    var bt_login = Ext.get('btnLogin')

    txt_email.on({
        focus: function() { txt_email.style.color = "green"; },
        blur: function() { txt_email.style.color = "black"; }
    })

    bt_login.on({
        destroyable: true,  
        // mouseover:   function() { console.log('mouseover'); },
        // mouseout:    function() { console.log('mouseout'); },
        click: function() {
            var email = txt_email.dom.value
            var password = txt_password.dom.value
            onLoginClick(email, password);
        }
    });*/
    
});

function onLoginClick(loginForm) {
    if (loginForm.isValid()) {
        debugger;
        var email = loginForm.getForm().findField('email').getValue()
        var password = loginForm.getForm().findField('password').getValue()
        alert(email  + ": " + password)
    }
}