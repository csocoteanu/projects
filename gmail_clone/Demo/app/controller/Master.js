Ext.define('MVVM.controller.Master', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control({
             'mvvm-MasterView': {
                 select : this.onGridSelect
             }
         });
     },
    
    onGridSelect : function(grid, record, index, eOpts) {
        var tabs = Ext.ComponentQuery.query('tabpanel')[0];

        var newTab = tabs.add({
            xtype : 'mvvm-DetailView',
            
            viewModel : {
                data : {
                    rec : record
                }
            }
        });
        
        tabs.setActiveItem(newTab);
    }
});