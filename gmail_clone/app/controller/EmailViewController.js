Ext.define('GMAIL.controller.EmailViewController', {
    extend : 'Ext.app.Controller',
    
    init: function() {
         this.control(
            {
                '#emailGrid':
                { 
                    select : this.onGridSelect
                }
         });
     },

    onGridSelect : function(grid, record, index, eOpts) {
        var bodyform = grid.view.up('gmail-EmailView');
        bodyform.getViewModel().setData({rec: record});
        bodyform.getViewModel().notify();
    }
});