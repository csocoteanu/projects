Ext.define('GMAIL.controller.ComposeEmailController', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control(
            {
                '#sendButton':
                {
                    click : this.onSendEmailClick
                }
         });
     },

    onSendEmailClick : function(btn) {

        var composeEmailView = btn.up('gmail-ComposeNewEmailView');
        var emailModel = composeEmailView.getViewModel();
        var data = emailModel.getData();

        console.log(data.rec);

        emailModel.setData({rec: null});
        emailModel.notify();
    }
});