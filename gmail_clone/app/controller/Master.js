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
        var bodyform =  this.getEmailViewFromGrid(grid);
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
                    var form = Ext.ComponentQuery.query('gmail-Login')[0];
                    var mainPage = form.up();
                    mainPage.setActiveItem(form);
                } else if (yesno == "no") {
                    tabPanel.setActiveTab(oldTab)
                }
            });
        }
    },

    onSendEmailClick : function(btn) {
        var composeEmailView = btn.up('gmail-ComposeEmailView');
        var emailModel = composeEmailView.getViewModel();
        var data = emailModel.getData();

        console.log(data.rec);

        emailModel.setData({rec: null});
        emailModel.notify();
    },

    getEmailViewFromGrid : function(grid) {
        var emailView      = null;
        var startElement   = grid.view;

        while (startElement) {
            var id = startElement.id;

            if (this.idIsFromEmailView(id)) {
                break;
            }

            startElement = startElement.up();
        }

        emailView = startElement;
        return emailView;
    },

    idIsFromEmailView : function(id) {
        var emailViewIdasString     = null;
        var kEmailViewStringPattern = 'gmail-EmailView-';
        var kEmailViewStringLength  = kEmailViewStringPattern.length;

        var index = id.indexOf(kEmailViewStringPattern);
        if (index != -1) {
            emailViewIdasString = id.substring(index + kEmailViewStringLength);
        }

        return emailViewIdasString != null && !isNaN(emailViewIdasString);
    }
});