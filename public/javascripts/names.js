$(function(){

	$('#name_form').submit(function(event){
		event.preventDefault();
		console.log('here!');
		var user_name;
		user_name = { new_name: $('#user_name').val() };
		socket.emit('nameChange', JSON.stringify(user_name));
	})

	$("#colorPicker").spectrum({
		clickoutFiresChange: true,
		change: function(color) {
		    socket.emit("setColor", color.toHexString());
		}
	});

	$('#sendMessage').click(function() {
		var message = $('#chatMessage').val();
		console.log(message);
		if(message.length > 0) {
			$('#chatMessage').val('');
			socket.emit('sendChat', message);
		}
	});

	$('#chatMessage').keypress(function(e) {
		if(e.which == 13) {
			$(this).blur();
			$('#datasend').focus().click();
		}
	});

	$('#chatMessage').focus(function() {
		textFocus = true;
	});
	$('#chatMessage').focusout(function() {
		textFocus = false;
	});
})