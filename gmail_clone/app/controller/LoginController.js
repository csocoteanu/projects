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
            
            if (isLoginSuccesfull(email, password)) {
               onLoginSuccesfull(); 
            } else {
                emailField.setActiveError("ERROR! Invalid username or password!");
            }
        }
    }
});

function isLoginSuccesfull(email, password) {
    return true;
}

function onLoginSuccesfull() {
    var mainView = Ext.ComponentQuery.query('gmail-MainView')[0];
    mainView.fireEvent('initemailview', mainView);
}