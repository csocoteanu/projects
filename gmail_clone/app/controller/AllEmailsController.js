Ext.define('GMAIL.controller.AllEmailsController', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control({
            /*'#allTabs': 
                { 
                    beforetabchange : this.beforeTabChanged,
                    focus        : this.onActivate
                }*/
         });
    },

    beforeTabChanged: function(tabPanel, newTab, oldTab, eOpts)  {
        debugger;
    },

    onActivate : function(tabPanel, eOpts) {
        debugger;
        tabPanel.setActiveTab(0);
    }
});