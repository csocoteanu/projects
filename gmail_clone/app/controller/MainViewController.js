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

        this.setGridTitleAndCreateStore(inboxTab, 'Inbox');
        this.setGridTitleAndCreateStore(sentMailTab, 'Sent');
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

    onInitEmailView : function(tabPanel, tokenId) {
        tabPanel.tokenId = tokenId;

        // change tab to inbox tabPanel
        this.changeView(tabPanel);
        tabPanel.setActiveTab(0);

        this.triggerEventOnGrid(/* Inbox View */ tabPanel.items.get(0), 'initview');
        this.triggerEventOnGrid(/* Sent Mail View */ tabPanel.items.get(1), 'initview');
    },

    onClearEmailView : function(tabPanel) {
        this.triggerEventOnGrid(/* Inbox View */ tabPanel.items.get(0), 'clearview');
        this.triggerEventOnGrid(/* Sent Mail View */ tabPanel.items.get(1), 'clearview');
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
    },

    triggerEventOnGrid : function(tabView, eventName) {
        var grid = tabView.getComponent('emailGrid');
        grid.fireEvent(eventName, grid, tabView);
    },

    setGridTitleAndCreateStore : function(tabView, gridTitle) {
        // Set tab name for #gridTitle and store type
        tabView.getComponent('emailGrid').setTitle(gridTitle);
        tabView.getComponent('emailGrid').reconfigure(Ext.create('GMAIL.store.Emails', { storeType : gridTitle.toLowerCase() }));
    }
});