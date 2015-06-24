Ext.define('GMAIL.store.Emails', {
    extend  : 'Ext.data.Store',

    requires : [
        'GMAIL.model.Email'
    ],
    
    storeId : 'Emails',
    model   : 'GMAIL.model.Email',
    
    data : [
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '21-06-2015',
            'subject' : 'Hello',
            'body'    : 'Hello again!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '22-06-2015',
            'subject' : 'Hello again',
            'body'    : 'Hello again from subject!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '23-06-2015',
            'subject' : 'Hola',
            'body'    : 'Hola again from subject!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '24-06-2015',
            'subject' : 'Hi',
            'body'    : 'Hi again from subject!',
            'read'    : false
        }
    ]
});