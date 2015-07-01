Ext.define('GMAIL.store.Emails', {
    extend  : 'Ext.data.Store',

    requires : [
        'GMAIL.model.Email'
    ],
    
    storeId : 'Emails',
    model   : 'GMAIL.model.Email',
    
    data : [],

    storeType : null,

    getEmails : function() {
        var emailData = []
        if (this.storeType == "inbox") {
            emailData = this.getInboxEmails();
        } else if (this.storeType == "sent") {
            emailData = this.getSentEmails();
        }

        this.loadData(emailData);
    },

    getInboxEmails : function() {
        var tokenId = this.getTokenId();
        this.getAllEmails(tokenId, "inbox");

        return [];
    },

    getSentEmails : function() {
        return []
    },

    resetEmails : function() {
        this.loadData([]);
    },

    getTokenId : function() {
        var mainView = Ext.ComponentQuery.query('gmail-MainView')[0];
        return mainView.tokenId;
    },

    getAllEmails : function(tokenId, emailType) {
        Ext.Ajax.request({
            url      : 'http://localhost:9090/api/getEmails',
            headers  : { 'Content-Type': 'application/json' },
            method   : 'GET',          
            params   : { 'tokenId': tokenId, 'emailType': emailType },
            jsonData : { },
            success  : this.onGetEmailsSuccesfull,
            failure  : this.onGetEmailsFailed
        });
    },

    onGetEmailsSuccesfull : function() {
        alert("success");
    },

    onGetEmailsFailed : function() {
        alert("failed");
    }
});