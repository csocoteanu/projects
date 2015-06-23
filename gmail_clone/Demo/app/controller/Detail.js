Ext.define('MVVM.controller.Detail', {
    extend : 'Ext.app.Controller',
    
    init : function() {
        this.control({
            'mvvm-DetailView > button#SaveRecord' : {
                click : this.onSaveButtonClick
            }
        });
    },
    
    onSaveButtonClick : function(btn) {
        //get reference to the form
        var detailView = btn.up('mvvm-DetailView');
        
		//get the bound record
        var record = detailView.getViewModel().getData().rec;
        
        if (record) {
            record.commit(); //there is no backend... so I can't call record.save()
            Ext.Msg.alert('Success?', 'Record saved! (Not really.)');
        }
        else {
            Ext.Msg.alert('Failure', 'Please select a record first.');
        }
    }
});