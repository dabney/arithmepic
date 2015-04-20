
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.titleScreenSprite = null;

};

BasicGame.MainMenu.prototype = {
//var titleScreenSprite,
	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		this.titleScreenSprite = this.add.sprite(0, 0, 'titleScreen');


		this.playButton = this.add.button(160, 400, 'playButton', this.startGame, this, 'buttonOver.png', 'buttonOut.png', 'buttonOver.png');
		
		var buttonTween = this.game.add.tween(this.playButton)
      .to({x:this.playButton.position.x + 10, y:this.playButton.position.y + 10}, 3000, Phaser.Easing.Linear.In, true)
      .to({x:this.playButton.position.x - 10, y:this.playButton.position.y - 10}, 3000, Phaser.Easing.Linear.Out, true)
      .loop();

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.game.state.start('Game');

	}

};
