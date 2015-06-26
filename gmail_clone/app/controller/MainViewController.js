Ext.define('GMAIL.controller.MainViewController', {
    extend : 'Ext.app.Controller',
    
    init: function() {
        this.control({
            '#allTabs': 
                 {
                    render             : this.onPanelRender,
                    beforetabchange    : this.beforeTabChanged,
                    destroy            : this.onDestroy,
                    'initemailview'    : this.onInitEmailView,
                    'clearemailview'   : this.onClearEmailView
                }
        });
    },

    onPanelRender : function(tabPanel, eOpts) {
        var inboxTab    = tabPanel.items.get(0);
        var sentMailTab = tabPanel.items.get(1);

        // Set tab name for Inbox and store type
        inboxTab.getComponent('emailGrid').setTitle('Inbox')
        inboxTab.getComponent('emailGrid').reconfigure(Ext.create('GMAIL.store.Emails', { storeType : 'inbox' }));

        // Set tab name for Sent Email and store type
        sentMailTab.getComponent('emailGrid').setTitle('Sent Email')
        sentMailTab.getComponent('emailGrid').reconfigure(Ext.create('GMAIL.store.Emails', { storeType: 'sent' }));
    },

    beforeTabChanged: function(tabPanel, newTab, oldTab, eOpts)  {
        var logoutTab  = tabPanel.items.get(3);
        var controller = this;

        if (newTab == logoutTab) {
            this.showConfirmationBox(tabPanel, newTab, oldTab);
        }
    }, 

    onDestroy : function(tabPanel, eOpts) {
        // TODO: investigate how to properly call up this EXT.JS cleanup API
        // TODO: cleanup existing data stores
        debugger;
    },

    onInitEmailView : function(tabPanel) {
        this.changeView(tabPanel);
        // change tab to inbox tab
        tabPanel.setActiveTab(0);

        var inboxTab  = tabPanel.items.get(0);
        var inboxGrid = inboxTab.getComponent('emailGrid');
        
        var store = inboxGrid.getStore();
        store.getEmails();
        inboxGrid.reconfigure(store);
    },

    onClearEmailView : function(tabPanel) {
        var inboxTab  = tabPanel.items.get(0);
        var inboxGrid = inboxTab.getComponent('emailGrid');
        
        inboxGrid.getSelectionModel().deselectAll();
        inboxTab.getViewModel().setData({rec: null});
        inboxTab.getViewModel().notify();

        var store = inboxGrid.getStore();
        store.resetEmails();
        inboxGrid.reconfigure(store);
    },

    showConfirmationBox : function(tabPanel, newTab, oldTab) {
        Ext.MessageBox.confirm(
            'Confirm',
            'Are you sure you want to do that?', 
            function(confirmation) {
                if (confirmation == "yes") {
                    this.onClearEmailView(tabPanel);

                    var loginView = Ext.ComponentQuery.query('gmail-LoginView')[0];
                    this.changeView(loginView);
                } else {
                    tabPanel.setActiveTab(oldTab)
                }
            }, 
            this
        );
    },

    changeView : function(newView) {
        var viewport = newView.up();
        viewport.setActiveItem(newView);
    }
});