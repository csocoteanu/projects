Ext.define('MVVM.view.Master', {
    extend : 'Ext.grid.Panel',
    xtype  : 'mvvm-MasterView',
    
    title : 'Master Panel',
    
    store : 'People',
    
    columns: [
        { 
            text      : 'Name',  
            dataIndex : 'name' 
        },
        { 
            text      : 'Email', 
            dataIndex : 'email', 
            flex      : 1 
        },
        { 
            text      : 'Phone',
            dataIndex : 'phone' 
        }
    ]
});