var Gerald = {
	
	createWorld: function() {
		
		var GERALD_WIDTH = 80,
			GERALD_HEIGHT = 100;

		// make the world
		Crafty.init(700, 700);
		Crafty.background('rgb(127,127,127)');
		
		this.currObjects = [];

		// make gerald
		var gerald = this.gerald = Crafty.e("Gerald, 2D, DOM, Color, Collision, Multiway")
			.color('rgb(0,0,0)')
			.attr({ x: 50, y: 480, w: GERALD_WIDTH, h: GERALD_HEIGHT, z: 10 })
			.multiway(8, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});

		gerald.onHit("GCollidable", function() {
			var collidedObj = gerald.hit("GCollidable")[0].obj;
			// hits left side
			if (gerald.x < collidedObj.x - gerald.w + 10) {
				gerald.x -= 10;	
			}
			// hits right side
			if (gerald.x > collidedObj.x + collidedObj.w - 10) {
				gerald.x += 10;
			}
			// hits top
			if (gerald.y < collidedObj.y - gerald.h + 10) {
				gerald.y -= 10;
			}
			// hits bottom 
			if (gerald.y > collidedObj.y + collidedObj.h - 10) {
				gerald.y += 10;
			}
		});
		
		// make the four walls 
		this.topWall = Crafty.e("2D, DOM, Collision, GCollidable")
			.attr({ x: -20, y: -20, w: 740, h: 20, z: 10 });
		this.bottomWall = Crafty.e("2D, DOM, Collision, GCollidable")
			.attr({ x: -20, y: 700, w: 740, h: 20, z: 10 });
		this.rightWall = Crafty.e("2D, DOM, Collision, GCollidable")
			.attr({ x: 700, y: -20, w: 20, h: 740, z: 10 });
		this.leftWall = Crafty.e("2D, DOM, Collision, GCollidable")
			.attr({ x: -20, y: -20, w: 20, h: 740, z: 10 });
		
		var self = this;
		gerald.onHit("Door", function() {
			var collidedObj = gerald.hit("Door")[0].obj;
			var transition = collidedObj.transition;
			
			for (var i = 0, iMax = self.currObjects.length; i < iMax; i += 1) {
				var worldObj = self.currObjects[i];
				worldObj.destroy();	
				self.currObjects.slice(i, 1);
			}
			
			switch (transition) {
				case 'bedroom':
					self.createBedroom(collidedObj.positionOpp);
					break;
				case 'bathroom':
					self.createBathroom(collidedObj.positionOpp);
					break;
				case 'hallway':
					self.createHallway(collidedObj.positionOpp);
					break;
				case 'kitchen':
					self.createKitchen(collidedObj.positionOpp);
					break;
				case 'diningRoom':
					self.createDiningRoom(collidedObj.positionOpp);
					break;	
			}
		});

		this.createBedroom('start');

	},
	
	createBedroom: function(startPoint) {
		
		this.positionGerald(startPoint);
				
		// bed
		var bed = this.bed = Crafty.e("Bed, 2D, DOM, Color, Collision")
			.color('rgb(100,100,100)')
			.attr({ x: 30, y: 350, w: 250, h: 300, z: 5 });
		this.currObjects.push(bed);
			
		if (startPoint == 'start') {
			this.gerald.onHit("Bed", function(){}, function() {
				bed.addComponent("GCollidable");
			});
		} else {
			bed.addComponent("GCollidable");	
		}
			
		// tv stand
		var tvStand = this.tvStand = Crafty.e("TVStand, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 30, y: 30, w: 200, h: 100, z: 5 });
		this.currObjects.push(tvStand);

		// dresser
		var dresser = this.dresser = Crafty.e("Dresser, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 530, y: 450, w: 130, h: 200, z: 5 });
		this.currObjects.push(dresser);
			
		// make two doors
		this.createDoors(['right', 'top'], ['bathroom', 'hallway']);
			
		
	},
	
	createBathroom: function(startPoint) {
		
		this.positionGerald(startPoint);
		
		// toilet
		var toilet = this.toilet = Crafty.e("Toilet, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 50, y: 30, w: 80, h: 110, z: 5 });
		this.currObjects.push(toilet);
			
		// sink
		var sink = this.sink = Crafty.e("Sink, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 540, y: 10, w: 150, h: 150, z: 5 });
		this.currObjects.push(sink);

		// bathtub
		var bathtub = this.bathtub = Crafty.e("Bathtub, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 510, y: 300, w: 180, h: 370, z: 5 });
		this.currObjects.push(bathtub);
		
		// make the door
		this.createDoors(['left'], ['bedroom']);
	},	
	
	createHallway: function(startPoint) {
		
		this.positionGerald(startPoint);
		
		// sunflower painting
		var hallSfPainting = this.hallSfPainting = Crafty.e("hallSfPainting, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 550, y: 300, w: 140, h: 100, z: 5 });
		this.currObjects.push(hallSfPainting);
		
		// scream painting
		var screamPainting = this.screamPainting = Crafty.e("screamPainting, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 10, y: 300, w: 140, h: 100, z: 5 });
		this.currObjects.push(screamPainting);
		
		// make the doors
		this.createDoors(['bottom', 'top'], ['bedroom', 'kitchen']);
	},
	
	createKitchen: function(startPoint) {

		this.positionGerald(startPoint);
	
		// fridge
		var fridge = this.fridge = Crafty.e("Fridge, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 10, y: 500, w: 190, h: 190, z: 5 });
		this.currObjects.push(fridge);
		
		// stove
		var stove = this.stove = Crafty.e("Stove, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 10, y: 10, w: 220, h: 190, z: 5 });
		this.currObjects.push(stove);
		
		// counter
		var counter = this.counter = Crafty.e("Counter, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 240, y: 10, w: 220, h: 190, z: 5 });
		this.currObjects.push(counter);
		
		// kitchen sink
		var ksink = this.ksink = Crafty.e("KSink, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 470, y: 10, w: 220, h: 190, z: 5 });
		this.currObjects.push(ksink);
		
		// make the door
		this.createDoors(['bottom', 'right'], ['hallway', 'diningRoom']);
	},
	
	createDiningRoom: function(startPoint) {
		
		this.positionGerald(startPoint);
		
		// table
		var table = this.table = Crafty.e("Table, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 250, y: 150, w: 200, h: 400, z: 5 });
		this.currObjects.push(table);
		
		// sunflower painting
		var drSfPainting = this.drSfPainting = Crafty.e("drSfPainting, 2D, DOM, Color, Collision, GCollidable")
			.color('rgb(100,100,100)')
			.attr({ x: 530, y: 300, w: 160, h: 100, z: 5 });
		this.currObjects.push(drSfPainting);
		
		// make the door
		this.createDoors(['left'], ['kitchen']);
	},
	
	createDoors: function (positions, transitions) {
		
		var DOOR_COLOR = '#4d2700',
			DOOR_LONG = 150,
			DOOR_SHORT = 20;
		
		var i, iMax, dPos;
		for (i = 0, iMax = positions.length; i < iMax; i += 1) {
			dPos = positions[i];
			switch (dPos) {
				case 'top':
					this.topDoor = Crafty.e("2D, DOM, Color, Collision, Door")
						.color(DOOR_COLOR)
						.attr({ x: 275, y: 0, w: DOOR_LONG, h: DOOR_SHORT, z: 6 }); 
					this.topDoor.transition = transitions[i];
					this.topDoor.positionOpp = 'bottom';
					this.currObjects.push(this.topDoor);
					break;
				case 'bottom':
					this.bottomDoor = Crafty.e("2D, DOM, Color, Collision, Door")
						.color(DOOR_COLOR)
						.attr({ x: 275, y: 680, w: DOOR_LONG, h: DOOR_SHORT, z: 6 }); 
					this.bottomDoor.transition = transitions[i];
					this.bottomDoor.positionOpp = 'top';
					this.currObjects.push(this.bottomDoor);
					break;
				case 'left':
					this.leftDoor = Crafty.e("2D, DOM, Color, Collision, Door")
						.color(DOOR_COLOR)
						.attr({ x: 0, y: 275, w: DOOR_SHORT, h: DOOR_LONG, z: 6 }); 
					this.leftDoor.transition = transitions[i];
					this.leftDoor.positionOpp = 'right';
					this.currObjects.push(this.leftDoor);
					break;
				case 'right':
					this.rightDoor = Crafty.e("2D, DOM, Color, Collision, Door")
						.color(DOOR_COLOR)
						.attr({ x: 680, y: 275, w: DOOR_SHORT, h: DOOR_LONG, z: 6 })
					this.rightDoor.transition = transitions[i];
					this.rightDoor.positionOpp = 'left';
					this.currObjects.push(this.rightDoor);
					break;	
			}	
		} 
	},
	
	positionGerald: function (startPoint) {
					
		switch (startPoint) {
			case 'start':
				break;
			case 'right':
				this.gerald.attr({ x: 600, y: 300, w: 80, h: 100, z: 10 });
				break;
			case 'top':
				this.gerald.attr({ x: 275, y: 30, w: 80, h: 100, z: 10 });
				break;
			case 'left':
				this.gerald.attr({ x: 20, y: 300, w: 80, h: 100, z: 10 });
				break;
			case 'bottom':
				this.gerald.attr({ x: 310, y: 550, w: 80, h: 100, z: 10 });
				break;
		}
		
	}
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