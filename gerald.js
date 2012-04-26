var Gerald = {
	
	createWorld: function() {

		Crafty.init(700, 700);
		Crafty.background('rgb(127,127,127)');

		this.createBedroom('start');

	},
	
	createBedroom: function(startPoint) {
		
		// gerald
		var gerald = Crafty.e("Gerald, 2D, DOM, Color, Collision, Multiway")
			.color('rgb(0,0,0)')
			.attr({ x: 50, y: 480, w: 80, h: 100, z: 10 })
			.multiway(5, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
			
		switch (startPoint) {
			case 'start':
				break;
			case 'bathroomdoor':
				break;
			case 'halldoor':
				break;
		};
				
		// bed
		Crafty.e("Bed, 2D, DOM, Color, Collision")
			.color('rgb(100,100,100)')
			.attr({ x: 30, y: 350, w: 250, h: 300, z: 5 });
			
		// tv stand
		Crafty.e("TVStand, 2D, DOM, Color, Collision")
			.color('rgb(100,100,100)')
			.attr({ x: 30, y: 30, w: 250, h: 100, z: 5 });
		
		// dresser
		var dresser = Crafty.e("Dresser, 2D, DOM, Color, Collision")
			.color('rgb(100,100,100)')
			.attr({ x: 530, y: 400, w: 130, h: 200, z: 5 });
			
						
		gerald.onHit("Dresser", function() {
			//alert("Hit Dresser");
			gerald.x -= 10;
		});
		
	},	
};

$(document).ready(function() {
	$(document).keydown(function(e) {
	     var key = e.which;
	     if (key == 40 || key == 38) {
	        e.preventDefault();
	        return false;
	     }
	     return true;
	});
	Gerald.createWorld();
});