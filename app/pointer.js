function Pointer(){
	this.x = 240;
	this.y = 340;

	this.move = function(direction){
		switch(direction){
			case 'up':
				if (this.y > 340){
					this.y+=30;
				}
				break;
			case 'down':
				if (this.y < 400){
					this.y-=30;
				}
				break;
			default:
				this.y=y;
		}
	}
}
module.exports = function(){
	return new Pointer();
}