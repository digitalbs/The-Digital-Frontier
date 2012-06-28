//globally set the canvas context
var canvas; 
var context; 
var canvasWidth;
var canvasHeight;

$(function(){
	canvas = $("#canvasGame");
	context = canvas.get(0).getContext("2d");

	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);

	//canvas dimensinos
	canvasWidth = canvas.width();
	canvasHeight = canvas.height();
	
	
	//game settings
	var playGame;
	
	
	//setup asteroids
	var asteroids;
	var numAsteroids;
	
	//create player
	var player;
	var laser;
	var lasers;
	
	//add score
	var score;
	var scoreTimeout;
	
	//controls for player
	var arrowUp = 38;
	var arrowRight = 39;
	var arrowDown = 40;
	var arrowLeft = 37;
	var afterburner = 65;
	var spacebar = 32;
	
	
	//ui
	var ui = $('#gameUI');
	var uiIntro = $('#gameIntro');
	var uiStats = $('#gameStats');
	var uiComplete = $('#gameComplete');
	var uiPlay = $('#gamePlay');
	var uiReset = $('.gameReset');
	var uiRemaining = $('#gameRemaining');
	var uiScore = $('.gameScore');
	//var soundBackground = $('#gameSoundBackground').get(0);
	var soundThrust = $('#gameSoundThrust').get(0);
	var soundDeath = $('#gameSoundDeath').get(0);
	
	
	
	//score
	var score;

	//create asteroid
	var Asteroid = function(x, y, radius, vX)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;

		//add velocity
		this.vX = vX;
	}
	
	var Player = function(x, y){
		this.x = x;
		this.y = y;
		
		this.width = 80;
		this.height = 30;
		this.halfWidth = this.width/2;
		this.halfHeight = this.height/2;
		
		this.vX = 0;
		this.vY = 0;
		
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.afterburn = false;
		this.shoot = false;
		
		this.flameLength = 20;
	}
	
	//create laser
	var Laser = function(x, y)
	{
		this.x = x;
		this.y = y;
		
		this.width = 10;
		this.height = 3;
		this.vX = 8;
	}
	
	//reset game
	function resetPlayer()
	{
		
	}
	
	//reset and start game
	function startGame()
	{
		uiScore.html("0");
		uiStats.show();
		//setup initial game settings
		playGame = false;

		asteroids = new Array();
		lasers = new Array();
		numAsteroids = 10;
		
		score = 0;
		
		player = new Player(150, canvasHeight/2);
		
		
		for(var i = 0; i < numAsteroids; i++)
		{
			var radius = 5 + (Math.random() * 10);
			var x = canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			var y = Math.floor(Math.random() * canvasHeight);
			var vX = -5 - (Math.random() * 5);
			
			asteroids.push(new Asteroid(x, y, radius, vX));
		}			
		
		$(window).keydown(function(e)
		{
			var keyCode = e.keyCode;
			if(!playGame)
			{
				playGame = true;
				//soundBackground.currentTime = 0;
				//soundBackground.play();
				animate();
				timer();
			}
			
			if(keyCode == arrowRight)
			{
				player.moveRight = true;
				
				if(soundThrust.paused)
				{
					soundThrust.currentTime = 0;
					soundThrust.play();
				}
				
			}
			else if(keyCode == arrowUp)
			{
				player.moveUp = true;
			}
			else if(keyCode == arrowDown)
			{
				player.moveDown = true;
			}
			else if(keyCode == arrowLeft)
			{
				player.moveLeft = true;
			}
			else if(keyCode == spacebar)
			{
				player.shoot = true;
			}
			else if(keyCode == afterburner)
			{
			    player.afterburn = true;
			    if (soundThrust.paused) {
			        soundThrust.currentTime = 0;
			        soundThrust.play();
			    }
			}
			
		});
		
		$(window).keyup(function(e){
			var keyCode = e.keyCode;
			
			if(keyCode == arrowRight)
			{
				soundThrust.pause();
				player.moveRight = false;
			}
			else if(keyCode == arrowUp)
			{
				player.moveUp = false;
			}
			else if(keyCode == arrowDown)
			{
				player.moveDown = false;
			}
			else if(keyCode == arrowLeft)
			{
				player.moveLeft = false;
			}
			else if(keyCode == spacebar)
			{
				player.shoot = false;
			}
			else if(keyCode == afterburner) {
			    soundThrust.pause();
				player.afterburn = false;
			}
			
		});
				
		//start animation loop
		animate();
	}
	
	//timer for score 
	function timer()
	{
		if(score % 5 == 0)
		{
			numAsteroids += 5;
		}
		
		if(playGame)
		{
			scoreTimeout = setTimeout(function(){
				uiScore.html(++score);
				timer();
			}, 1000);
		}
	}
	
	//initalize game environment
	function init()
	{
		uiStats.hide();
		uiComplete.hide();
		
		uiPlay.click(function(e){
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
		
		uiReset.click(function(e){
			e.preventDefault();
			soundThrust.pause();
			//soundBackground.pause();
			clearTimeout(scoreTimeout);
			$(window).unbind('keyup');
			$(window).unbind('keydown');
			uiComplete.hide();
			startGame();
		});
		
		
	}
	
	
	function animate()
	{
		//clear
		context.clearRect(0, 0, canvasWidth, canvasHeight);

		for(var i = 0; i < asteroids.length; i++)
		{
			var tmpAsteroid = asteroids[i];
			
			//calculate new position
			if(tmpAsteroid.x + tmpAsteroid.radius < 0)
			{
				tmpAsteroid.radius = 15 + (Math.random() * 10);
				tmpAsteroid.x = canvasWidth + tmpAsteroid.radius;
				tmpAsteroid.y = Math.floor(Math.random() * canvasHeight);
				tmpAsteroid.vX = -5 - (Math.random() * 5);
			}
			tmpAsteroid.x += tmpAsteroid.vX;
			
			
			var dX = player.x - tmpAsteroid.x;
			var dY = player.y - tmpAsteroid.y;
			var distance = Math.sqrt((dX * dX) + (dY * dY));
			
			if(!(tmpAsteroid.x + tmpAsteroid.radius < player.x) && 
				!(player.x + player.width < tmpAsteroid.x) && 
				!(tmpAsteroid.y + tmpAsteroid.radius < player.y) && 
				!(player.y + player.height < tmpAsteroid.y))
			{
				soundThrust.pause();
				
				soundDeath.currentTime = 0;
				soundDeath.play();
				//$('body').append('<img src="Images/explosion.gif" id="explosion" />');
				
				/*
				$('#explosion').css({
					'left':player.x,
					'top':player.y
				});
				*/
				//your dead
				
				playGame = false;
				clearTimeout(scoreTimeout);
				
				
				uiStats.hide();
				uiComplete.show();
				
				//soundBackground.pause();
				$(window).unbind('keyup');
			
			}
			
			var asImage = new Image();
			asImage.src = "Images/asteroid.png";
			
			context.drawImage(asImage, tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, tmpAsteroid.radius);
			
			/*
			context.beginPath()
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
			
			context.closePath();
			context.fill();
			*/
		}
		
		player.vX = 0;
		player.vY = 0;
		
		if(player.moveRight)
		{
			player.vX = 3;
		}
		else
		{
			player.vX = -3;
		}
		
		if(player.moveLeft)
		{
			player.vX = -6;
		}
		
		if(player.moveUp)
		{
			player.vY = -3;
		}
		
		if(player.moveDown)
		{
			player.vY = 3;
		}
		
		if(player.afterburn)
		{
			player.vX = 6;
		}
		
		player.x += player.vX;
		player.y += player.vY;
		
		if(player.x - player.halfWidth < 20)
		{
			player.x = 20 + player.halfWidth;
		}
		else if(player.x + player.halfWidth > canvasWidth - 20)
		{
			player.x = canvasWidth - 20 - player.halfWidth;
		}
		
		if(player.y - player.halfHeight < 20)
		{
			player.y = 20 + player.halfHeight;
		}
		else if(player.y + player.halfHeight > canvasHeight - 20)
		{
			player.y = canvasHeight - 20 - player.halfHeight;
		}
		
		//create new spaceship
		var image = new Image();
		image.src = "Images/spaceship.png";
		
		context.drawImage(image, player.x, player.y, player.width, player.height);	
		
		//context.fillStyle = "rgb(255, 0, 0)";
		//context.beginPath();
		//context.moveTo(player.x + player.halfWidth, player.y);
		//context.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
		//context.lineTo(player.x - player.halfWidth, player.y + player.halfHeight);
		
		//context.closePath();
		//context.fill();
		
		while(asteroids.length < numAsteroids)
		{
			var radius;
			if(numAsteroids < 30)
			{
				radius = 5 + (Math.random() * 10);
			}
			else
			{
				radius = 25 + (Math.random() * 10);
			}
			var x = canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			var y = Math.floor(Math.random() * canvasHeight);
			var vX = -5 - (Math.random() * 5);
			
			asteroids.push(new Asteroid(x, y, radius, vX));
		}
		
		if(player.moveRight || player.afterburn)
		{
			context.save();
			context.translate(player.x, player.y + 12);
			if(player.flameLength == 20)
			{
				player.flameLength = 15;
			}
			else
			{
				player.flameLength = 20;
			}
			if(player.afterburn)
			{
				player.flameLength = 30;
			}
			context.fillStyle = "orange";
			context.beginPath();
			context.moveTo(0, -3);
			context.lineTo(-player.flameLength, 0);
			context.lineTo(0, 3);
			context.closePath();
			context.fill();
			
			context.restore();
		}
		
		if(player.shoot)
		{
			lasers.push(new Laser(player.x + 50, player.y + 5));
		}
		
		if(playGame)
		{
			//run animation every 33 ms
			setTimeout(animate, 33);
		}
		
		for(var i = 0; i < lasers.length; i++)
		{
			var lasered = lasers[i];
			context.fillStyle = "red";
			
			
			if(player.afterburn)
			{
				lasered.x += 25;
			}
			else
			{
				context.fillRect(lasered.x + 25, lasered.y + 5, lasered.width, lasered.height);
				lasered.x += 15;
			}
			
			if(!(tmpAsteroid.x + tmpAsteroid.radius < lasered.x ) && 
				!(lasered.x + lasered.width < tmpAsteroid.x) && 
				!(tmpAsteroid.y + tmpAsteroid.radius < lasered.y) && 
				!(lasered.y + lasered.height < tmpAsteroid.y))
			{
				lasers.splice(lasers.length - 1, 1);
			}		

		}
		
	};
	init();
	
	
	
	
	
});



