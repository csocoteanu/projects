Ext.define('GMAIL.controller.Master', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control(
            {
                '#emailGrid':
                { 
                    select : this.onGridSelect
                },
                '#allTabs': 
                 {
                    render          : this.onPanelRender,
                    beforetabchange : this.beforeTabChanged
                },
                '#sendButton':
                {
                    click : this.onSendEmailClick
                }
         });
     },

    onGridSelect : function(grid, record, index, eOpts) {
        var bodyform = grid.view.up('gmail-EmailView');
        bodyform.getViewModel().setData({rec: record});
        bodyform.getViewModel().notify();
    },

    onPanelRender : function(tabPanel, eOpts) {
        var inboxTab    = tabPanel.items.get(0);
        var sentMailTab = tabPanel.items.get(1);

        // Set tab name for Inbox
        inboxTab.getComponent('emailGrid').setTitle('Inbox')
        // Set tab name for Sent Email
        sentMailTab.getComponent('emailGrid').setTitle('Sent Email')

        // populate data for grids
        var inboxStore = Ext.create('GMAIL.store.Emails', { storeType : 'inbox' });
        inboxStore.getEmails();
        inboxTab.getComponent('emailGrid').reconfigure(inboxStore);

        var sentMailStore = Ext.create('GMAIL.store.Emails', { storeType: 'sent' });
        sentMailStore.getEmails();
        sentMailTab.getComponent('emailGrid').reconfigure(sentMailStore);
    },

    beforeTabChanged: function(tabPanel, newTab, oldTab, eOpts)  {
        if (newTab == tabPanel.items.get(3)) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(yesno) {
                if (yesno == "yes") {
                    var form = Ext.ComponentQuery.query('gmail-LoginView')[0];
                    var mainPage = form.up();
                    mainPage.setActiveItem(form);
                } else if (yesno == "no") {
                    tabPanel.setActiveTab(oldTab)
                }
            });
        }
    },

    onSendEmailClick : function(btn) {
        var composeEmailView = btn.up('gmail-ComposeNewEmailView');
        var emailModel = null;
        var data = null; 

        emailModel = composeEmailView.getViewModel();
        datat = emailModel.getData();

        console.log(data.rec);

        emailModel.setData({rec: null});
        emailModel.notify();
    }
});