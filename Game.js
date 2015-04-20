
BasicGame.Game = function (game) {

};

var globalGameObject;

BasicGame.Game.prototype = {
	currentPicSprite: null,
	boxes: [],
	numberBubbles: null,
	flippedTileCount: 0,
	BUBBLEVELOCITY: 25,
	NUMBEROFBOXES: 9,

	create: function () {
		globalGameObject = this;
		var currentBox;
		var currentBubble;
		var boxCount = 0;
		this.currentPicSprite = this.add.sprite(10, 100, 'currentPic');
		//this.boxes = this.add.group();

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				currentBox = this.add.sprite(10 + i*100, 100+j*100, 'yellowSquare');
				currentBox.a = Math.floor(Math.random() * 11);
				currentBox.b = Math.floor(Math.random() * 11);
				currentBox.value = currentBox.a + currentBox.b;
				currentBox.textObject = game.add.text(10 + i*100 +10, 100+j*100+50, currentBox.a +' + '+ currentBox.b,{fontSize : '34px',fill : '#000'});
				this.boxes[boxCount] = currentBox;
				console.log('box '+ boxCount +', value: '+currentBox.value);
				//this.createNumberBubble(currentBox.value);
				boxCount++;
				}
			}
			
			this.numberBubbles = this.add.group();
			for (i = 0; i < 9; i++) {
			console.log('creating number bubble: ' + this.boxes[i].value);
				//this.createNumberBubble(this.boxes[i].value);
				currentBubble = this.numberBubbles.create(Math.random() * 280, Math.random() * 400, 'numberBubbles', 'bubble_' + this.boxes[i].value + '.png');
				currentBubble.value = this.boxes[i].value;
				currentBubble.body.velocity.y = this.BUBBLEVELOCITY;
				currentBubble.inputEnabled = true;
				currentBubble.input.enableDrag(true, true, true, 1, null, null);
				currentBubble.input.useHandCursor = true;
				currentBubble.outOfBoundsKill = true;
				currentBubble.events.onDragStart.add(this.dragStarted, currentBubble);
				currentBubble.events.onDragStop.add(this.dragReleased, currentBubble);
			};
			
	},
	
	createNumberBubble: function(matchingBoxValue) {
		var currentBubble;
		currentBubble = globalGameObject.numberBubbles.create(Math.random() * 280, Math.random() * 400, 'numberBubbles', 'bubble_' + matchingBoxValue + '.png');
				currentBubble.value = matchingBoxValue;
		//currentBubble.value = this.value;
				currentBubble.body.velocity.y = this.BUBBLEVELOCITY;
				currentBubble.inputEnabled = true;
				currentBubble.input.enableDrag(true, true, true, 1, null, null);
				currentBubble.input.useHandCursor = true;
				currentBubble.outOfBoundsKill = true;
				currentBubble.events.onDragStart.add(this.dragStarted, currentBubble);
				currentBubble.events.onDragStop.add(this.dragReleased, currentBubble);
	},

	update: function () {
	var numberBubble;
	if (this.flippedTileCount === this.NUMBEROFBOXES) {
		this.flippedTileCount=0;
		window.setTimeout(this.refreshGame, 2000);
		}
	if (numberBubble = this.numberBubbles.getFirstExists(false)) {
		numberBubble.reset(Math.random() * 280, 0);
		numberBubble.body.velocity.y = this.BUBBLEVELOCITY;
		}
	},
	
	bubbleInsideBox: function(currentBox, currentBubble) {
	console.log('currentBubble: '+currentBubble.value);
console.log('currentBox: '+currentBox.value);
	if (Phaser.Rectangle.intersects(currentBubble.body, currentBox.body)) {

		if (currentBox.value === currentBubble.value) {
			currentBubble.kill();
			currentBox.kill();
			currentBox.textObject.setText('');
			globalGameObject.flippedTileCount++;
			console.log('flippedTileCount: ' + this.flippedTileCount);
		}
		else {
			currentBubble.body.velocity.y = globalGameObject.BUBBLEVELOCITY;
		}
	}
	else {
		currentBubble.body.velocity.y = globalGameObject.BUBBLEVELOCITY;
		}
	},
	
	dragStarted: function (draggedBubble) {
		draggedBubble.body.velocity.y = 0;
	},

	dragReleased: function (releasedBubble) {
	console.log('in dragReleased');
		for (var k = 0; k < 9; k++) {
		console.log('trying box '+k);
			globalGameObject.bubbleInsideBox(globalGameObject.boxes[k], releasedBubble);
		}
	},
	
	refreshGame: function (pointer) {

		this.game.state.start('Game');

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		
		this.game.state.start('MainMenu');

	}

};
