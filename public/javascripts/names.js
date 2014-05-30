$(function(){

	$('#name_form').submit(function(event){
		event.preventDefault();
		console.log('here!');
		var user_name;
		user_name = { new_name: $('#user_name').val() };
		socket.emit('nameChange', JSON.stringify(user_name));
	})
})