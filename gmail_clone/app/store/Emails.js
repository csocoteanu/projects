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
            'date'    : '22-06-2015',
            'subject' : 'Hello',
            'body'    : 'Hello again!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '22-06-2015',
            'subject' : 'Hello',
            'body'    : 'Hello again!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '22-06-2015',
            'subject' : 'Hello',
            'body'    : 'Hello again!',
            'read'    : false
        },
        { 
            'sender'  : 'lisa@simpsons.com',
            'date'    : '22-06-2015',
            'subject' : 'Hello',
            'body'    : 'Hello again!',
            'read'    : false
        }
    ]
});