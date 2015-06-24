Ext.define('GMAIL.controller.Master', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control({
             'gmail-EmailView': {
                 select : this.onGridSelect
             }
         });
     },
    
    onGridSelect : function(grid, record, index, eOpts) {
        var bodyform = Ext.ComponentQuery.query('gmail-EmailView')[0];
        bodyform.getViewModel().setData({rec: record})
        bodyform.getViewModel().notify()
    }
});