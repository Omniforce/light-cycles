function Pointer(){
	this.x = 240;
	this.y = 340;

	this.move = function(direction){
		switch(direction){
			case 'up':
				if (this.y > 340){
					this.y-=30;
				}
				break;
			case 'down':
				if (this.y < 400){
					this.y+=30;
				}
				break;
			default:
				this.y=this.y;
		}
	}
}
module.exports = new Pointer();