$(function(){
	window.addEventListener('keydown', keyDown);

	function keyDown(){
		var keyData;
		if(event.keyCode === 37){
			keyData = {key:'left'};
		}
		else if(event.keyCode === 38){
			keyData = {key:'up'};
		}
		else if(event.keyCode === 39){
			keyData = {key:'right'};
		}
		else if(event.keyCode === 40){
			keyData = {key:'down'};
		}
		else if(event.keyCode === 82) {
			if(!gameOver) { keyData = { key:'r' }; }
		}
		else{
			return;
		}
		socket.emit('keyPress', JSON.stringify(keyData));
	}

})