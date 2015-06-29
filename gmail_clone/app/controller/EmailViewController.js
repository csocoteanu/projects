Ext.define('GMAIL.controller.EmailViewController', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control(
            {
                '#emailGrid':
                { 
                    select      : this.onGridSelect,
                    'initview'  : this.onInitView,
                    'clearview' : this.onClearView
                },
         });
     },

    onGridSelect : function(grid, record, index, eOpts) {
        var bodyform = grid.view.up('gmail-EmailView');
        bodyform.getViewModel().setData({rec: record});
        bodyform.getViewModel().notify();
    },

    onInitView : function(emailGrid) {
        var store = emailGrid.getStore();

        store.getEmails();
        emailGrid.reconfigure(store);
    },

    onClearView : function(emailGrid, inboxTab) {
        emailGrid.getSelectionModel().deselectAll();
        inboxTab.getViewModel().setData({rec: null});
        inboxTab.getViewModel().notify();

        var store = emailGrid.getStore();
        store.resetEmails();
        emailGrid.reconfigure(store);
    }
});