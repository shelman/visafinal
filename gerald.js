var Gerald = {
	
	createWorld: function() {
				
		var self = this; 
		
		var GERALD_WIDTH = 80,
			GERALD_HEIGHT = 100;

		// make the world
		Crafty.init(700, 700);
		Crafty.background('rgb(127,127,127)');
		
		this.currObjects = [];
		this.textPanel = $('#textPanel');	
		this.ab1 = $('#ab1').hide();
		this.ab2 = $('#ab2').hide();
		this.ab3 = $('#ab3').hide();

		// make gerald
		var gerald = this.gerald = Crafty.e("Gerald, 2D, DOM, Color, Collision, Multiway")
			.color('rgb(0,0,0)')
			.attr({ x: 50, y: 480, w: GERALD_WIDTH, h: GERALD_HEIGHT, z: 10 })
			.multiway(8, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
		
		gerald.bind('Moved', function(from) {
			self.clearCollision();
			var itemHitAsArr;
			if ((itemHitAsArr = this.hit('GCollidable'))) {
				this.attr({ x:from.x, y:from.y });	
				self.triggerCollision(itemHitAsArr[0].obj);
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
			
			self.clearText();
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
			
		this.setText("Where am I?  This isn't my house... something feels wrong.  I should probably get out of here.");
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
		
	},
	
	setText: function(textValue) {
		this.textPanel.html(textValue);
	},
	
	clearText: function() {
		this.textPanel.html('');	
	}, 
	
	triggerCollision: function(itemHit) {
		switch (itemHit) {
			case this.dresser:
				this.triggerDresser();
				break;	
			case this.bed:
				this.triggerBed();
				break;
			case this.tvStand:
				this.triggerTvStand();
				break;
			case this.toilet:
				this.triggerToilet();
				break;
			case this.sink:
				this.triggerSink();
				break;
			case this.bathtub:
				this.triggerBathtub();
				break;
			case this.fridge:
				this.triggerFridge();
				break;
			case this.stove:
				this.triggerStove();
				break;
			case this.ksink:
				this.triggerKSink();
				break;
		}	
	},
	
	clearCollision: function() {
		this.ab1.hide();
		this.ab2.hide();
		this.ab3.hide();
		this.clearText();	
	},
	
	triggerDresser: function() {
		var self = this;
		this.ab1.html('Check drawers');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("There's nothing in any of the drawers... that's weird.");
		});	
	},
	
	triggerBed: function() {
		var self = this;
		this.ab1.html('Look under bed');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("It's too dark under the bed to see anything.");
		});
		
		this.ab2.html('Look under sheets');
		this.ab2.show();
		this.ab2.on('click', function() {
			self.setText("Nothing there.");
		});
		
		this.ab3.html('Take a nap');
		this.ab3.show();
		this.ab3.on('click', function() {
			self.setText("You should really just get out of here before whoever lives here gets back.");
		});
	},
	
	triggerTvStand: function() {
		var self = this;
		this.ab1.html('Turn on TV');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("There's nothing good on.");
		});
		
		this.ab2.html('Check drawers');
		this.ab2.show();
		this.ab2.on('click', function() {
			self.setText("Just a ton of TV Guides.  Nothing of interest.");
		});
	},
	
	triggerToilet: function() {
		var self = this;
		this.ab1.html('Use toilet');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("Eh, don't really need to.");
		});
	},
	
	triggerSink: function() {
		var self = this;
		this.ab1.html('Wash hands');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("The water won't turn on.");
		});
		
		this.ab2.html('Look in mirror');
		this.ab2.show();
		this.ab2.on('click', function() {
			self.setText("Stop checking yourself out, you have more important things to do.");
		});
	},
	
	triggerBathtub: function() {
		var self = this;
		this.ab1.html('Take a bath');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("Whoa!  That water's way too hot.");
		});
	},
	
	triggerFridge: function() {
		var self = this;
		this.ab1.html('Look in fridge');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("Just some cheese and batteries.  This person really needs to go shopping.");
		});	
	},
	
	triggerStove: function() {
		var self = this;
		this.ab1.html('Turn on oven');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("Why the hell do you want to do that?!");
		});	
		
		this.ab2.html('Look in oven');
		this.ab2.show();
		this.ab2.on('click', function() {
			self.setText("Who left a flashlight in here?  Won't turn on though.");
		});	
	},
	
	triggerKSink: function() {
		var self = this;
		this.ab1.html('Do dishes');
		this.ab1.show();
		this.ab1.on('click', function() {
			self.setText("Whoa!  That water's freezing, way too cold to effectively scrub these dishes.");
		});
		
		this.ab2.html('Inspect dishes');
		this.ab2.show();
		this.ab2.on('click', function() {
			self.setText("Hmm... one of these plates is filthy, but it looks like something's written on it under the caked food.");
		});
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