Ext.define('GMAIL.view.AllEmailViews', {
    extend            : 'Ext.tab.Panel',
    xtype             : 'gmail-AllEmailViews',
    itemId            : 'allTabs',

    activeTab         : 0,
    autoScroll        : false,
    layoutOnTabChange : true,

    items: [
        {
            title : 'Inbox',
            xtype : 'gmail-EmailView'
        },
        {
            title : 'Sent Email',
            xtype : 'gmail-EmailView'
        },
        {
            title : 'Compose new email',
            xtype : 'gmail-ComposeEmailView'
        },
        {
            title : 'Logout',
        }
    ]
});
