Ext.define('GMAIL.view.MainView', {
    extend            : 'Ext.tab.Panel',
    xtype             : 'gmail-MainView',
    itemId            : 'allTabs',

    activeTab         : 0,
    autoScroll        : false,
    layoutOnTabChange : true,

    tokenId           : null,

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
            xtype : 'gmail-ComposeNewEmailView'
        },
        {
            title : 'Logout',
        }
    ]
});
