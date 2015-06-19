Ext.onReady(function() {

    var email = Ext.get('tbEmail');
    var password = Ext.get('tbPassword');
    var login = Ext.get('btnLogin')

	Ext.select('btnLogin').on('click': function(e)
	{
		alert('email');
	});

    /*email.highlight();      // The element's background will highlight to yellow then fade back
	email.addClass('red');  // Add a custom CSS class (defined in ExtStart.css)
	email.center();         // Center the element in the viewport
	email.setOpacity(.25);  // Make the element partially-transparent

	password.highlight();      // The element's background will highlight to yellow then fade back
	password.addClass('red');  // Add a custom CSS class (defined in ExtStart.css)
	password.center();         // Center the element in the viewport
	password.setOpacity(.25);  // Make the element partially-transparent*/
});