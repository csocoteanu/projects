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
        return [
            { 
                'sender'  : 'lisa@simpsons1.com',
                'date'    : '21-06-2015',
                'subject' : 'Hello',
                'body'    : 'Hello again!',
                'read'    : false
            },
            { 
                'sender'  : 'lisa@simpsons2.com',
                'date'    : '22-06-2015',
                'subject' : 'Hello again',
                'body'    : 'Hello again from subject!',
                'read'    : false
            },
            { 
                'sender'  : 'lisa@simpsons3.com',
                'date'    : '23-06-2015',
                'subject' : 'Hola',
                'body'    : 'Hola again from subject!',
                'read'    : false
            },
            { 
                'sender'  : 'lisa@simpsons4.com',
                'date'    : '24-06-2015',
                'subject' : 'Hi',
                'body'    : 'Hi again from subject!',
                'read'    : false
            }
        ]
    },

    getSentEmails : function() {
        return []
    },

    resetEmails : function() {
        this.loadData([]);
    }
});