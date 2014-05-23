function Pointer(){
	// this.x = 240;
	// this.y = 340;

	// this.move = function(direction){
	// 	switch(direction){
	// 		case 'up':
	// 			if (this.y > 340){
	// 				this.y-=30;
	// 			}
	// 			break;
	// 		case 'down':
	// 			if (this.y < 400){
	// 				this.y+=30;
	// 			}
	// 			break;
	// 		default:
	// 			this.y=this.y;
	// 	}
	// }

	this.selection = 2;

	this.move = function(direction) {
		if (direction == "up") {
			this.selection--;
			if (this.selection < 2) { this.selection = 2; }
		}
		else if(direction == "down") {
			this.selection++;
			if (this.selection > 4) { this.selection = 4; }
		}
	}
}
module.exports = new Pointer();