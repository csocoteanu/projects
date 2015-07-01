Ext.define('GMAIL.controller.LoginController', {
    extend : 'Ext.app.Controller',
    
    init : function() {        

        this.control({
            '#loginButton' : {
                click : this.onLoginClick
            }
        });
    },
    
    onLoginClick : function(btn) {
        var loginView = btn.up('gmail-LoginView');

        
		if (loginView.isValid()) {
            var emailField = loginView.getForm().findField('email');
            var passwordField = loginView.getForm().findField('password');
            var email = emailField.getValue();
            var password = passwordField.getValue();
            
            checkLoginSuccesfull(email, password);
        }
    }
});

function checkLoginSuccesfull(email, password) {
    Ext.Ajax.request({
        url: 'http://localhost:9090/api/login',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',          
        params: { 'email'    : email, 'password' : password },
        jsonData : { },
        success: onLoginSuccesfull,                                    
        failure: onLoginFailed
    });
}

function onLoginSuccesfull(conn, response, options, eOpt) {
    var mainView = Ext.ComponentQuery.query('gmail-MainView')[0];
    var tokenId = Ext.decode(conn.responseText).tokenId;

    mainView.fireEvent('initemailview', mainView, tokenId);
}

function onLoginFailed(conn, response, options, eOpt) {
    var loginView = Ext.ComponentQuery.query('gmail-LoginView')[0];
    var emailField = loginView.getForm().findField('email');

    emailField.setActiveError("ERROR! Invalid username or password!");
}