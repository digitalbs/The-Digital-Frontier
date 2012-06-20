//globally set the canvas context
var canvas; 
var context; 
var canvasWidth;
var canvasHeight;

$(function(){
	canvas = $("#canvasGame");
	context = canvas.get(0).getContext("2d");

	//canvas dimensinos
	canvasWidth = canvas.width();
	canvasHeight = canvas.height();
	
	
	//game settings
	var playGame;
	
	//setup platform
	var platformX;
	var platformY;
	var platformOuterRadius;
	var platformInnerRadius;
	
	
	
	//setup asteroids
	var asteroids;
	
	//ui
	var ui = $('#gameUI');
	var uiIntro = $('#gameIntro');
	var uiStats = $('#gameStats');
	var uiComplete = $('#gameComplete');
	var uiPlay = $('#gamePlay');
	var uiReset = $('.gameReset');
	var uiRemaining = $('#gameRemaining');
	var uiScore = $('.gameScore');
	
	
	//create player
	var player;
	var playerOriginalX;
	var playerOriginalY;
	var playerSelected;
	var playerMaxAbsVelocity;
	var playerVelocityDampener;
	var powerX;
	var powerY;
	
	//score
	var score;

	//create asteroid
	var Asteroid = function(x, y, radius, mass, friction)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		
		//add mass
		this.mass = mass;
		
		//add friction
		this.friction = friction;
		
		//add velocity
		this.vX = 0;
		this.vY = 0;
		
		this.player = false;
	}
	
	//reset game
	function resetPlayer()
	{
		player.x = playerOriginalX;
		player.y = playerOriginalY;
		player.vX = 0;
		player.vY = 0;
	}
	
	//reset and start game
	function startGame()
	{
		score = 0;
		uiScore.html("0");
		uiStats.show();
		//setup initial game settings
		playGame = false;
		
		platformX = canvasWidth/2;
		platformY = 150;
		platformOuterRadius = 100;
		platformInnerRadius = 75;
		
		asteroids = new Array();
		
		playerSelected = false;
		playerMaxAbsVelocity = 30;
		playerVelocityDampener = 0.3;
		powerX = -1;
		powerY = -1;
		
		var pRadius = 15;
		var pMass = 10;
		var pFriction = 0.97;
		playerOriginalX = canvasWidth/2;
		playerOriginalY = canvasHeight - 150;
		player = new Asteroid(playerOriginalX, playerOriginalY, pRadius, pMass, pFriction);
		player.player = true;
		
		asteroids.push(player);
		
		var outerRing = 12;
		var ringCount = 3;
		var ringSpacing = (platformInnerRadius/(ringCount - 1)); //distance between each ring
		
		for(var r = 0; r < ringCount; r++)
		{
			var currentRing = 0; //asteroids around current ring
			var angle = 0; //angle between asteroids
			var ringRadius = 0;
			
			//is it the innermost ring?
			if(r == ringCount - 1)
			{
				currentRing = 1;
			}	
			else
			{
				currentRing = outerRing-(r*3);
				angle = 360/currentRing;
				ringRadius = platformInnerRadius-(ringSpacing*r);
			}
			
			for(var a = 0; a < currentRing; a++)
			{
				var x = 0;
				var y = 0;
				
				//Is the innermost ring?
				if(r == ringCount-1)
				{
					x = platformX;
					y = platformY;
				}
				else
				{
					x = platformX + (ringRadius * Math.cos((angle*a) * (Math.PI/180)));
					y = platformY + (ringRadius * Math.sin((angle*a) * (Math.PI/180)));
				}
				
				var radius = 10;
				var mass = 5;
				var friction = 0.95;
				asteroids.push(new Asteroid(x, y, radius, mass, friction));
				
			}
			//score
			uiRemaining.html(asteroids.length - 1);
			
			
		}
		
		//event handlers
		$(window).mousedown(function(e){
			if(!playerSelected && player.x == playerOriginalX && player.y == playerOriginalY)
			{
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX - canvasOffset.left);
				var canvasY = Math.floor(e.pageY - canvasOffset.top);
				
				if(!playGame)
				{
					playGame = true;
					animate();
				}
				
				var dX = player.x - canvasX;
				var dY = player.y - canvasY;
				
				var distance = Math.sqrt((dX*dX) + (dY*dY));
				var padding = 5;
				
				if(distance < player.radius + padding)
				{
					powerX = player.x;
					powerY = player.y;
					playerSelected = true;
				}
			}
		});
		
		$(window).mousemove(function(e){
			if(playerSelected)
			{
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX - canvasOffset.left);
				var canvasY = Math.floor(e.pageY - canvasOffset.top);
				var dX = player.x - canvasX;
				var dY = player.y - canvasY;
				
				var distance = Math.sqrt((dX*dX) + (dY*dY));
				
				if(distance*playerVelocityDampener < playerMaxAbsVelocity)
				{
					powerX = canvasX;
					powerY = canvasY;
				}
				else
				{
					var ratio = playerMaxAbsVelocity/(distance*playerVelocityDampener);
					powerX = player.x + (dX*ratio);
					powerY = player.y + (dY*ratio);
				}
			}
		});
		
		$(window).mouseup(function(e){
			if(playerSelected)
			{
				var dX = powerX - player.x;
				var dY = powerY - player.y;
				
				player.vX = -(dX * playerVelocityDampener);
				player.vY = -(dY * playerVelocityDampener);
				
				uiScore.html(++score);
			}
			
			playerSelected = false;
			powerX = -1;
			powerY = -1;
		});
		
		//start animation loop
		animate();
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
			uiComplete.hide();
			startGame();
		});
		
		
	}
	
	
	function animate()
	{
		//clear
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		//draw platform
		context.fillStyle = "rgb(100, 100, 100)";
		context.beginPath();
		context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		
		//animate bowl direction
		if(playerSelected)
		{
			context.strokeStyle = "rgba(255, 255, 255, 0.5)";
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(player.x, player.y);
			context.lineTo(powerX, powerY);
			context.closePath();
			context.stroke();
		}
		
		if(player.x != playerOriginalX && player.y != playerOriginalY)
		{
			if(player.vX == 0 && player.vY == 0)
			{
				resetPlayer();
			}
			else if(player.x + player.radius < 0)
			{
				resetPlayer();
			}
			else if(player.x - player.radius > canvasWidth)
			{
				resetPlayer();
			}
			else if(player.y + player.radius < 0)
			{
				resetPlayer();
			}
			else if(player.y - player.radius > canvasHeight)
			{
				resetPlayer();
			}
		}
		
		context.fillStyle = "rgb(255, 255, 255)";
		
		var deadAsteroids = new Array();

		for(var i = 0; i < asteroids.length; i++)
		{
			var tmpAsteroid = asteroids[i];
			
			//collision detection
			for(var j = i + 1; j < asteroids.length; j++)
			{
				var tmpAsteroidB = asteroids[j];
				
				var dX = tmpAsteroidB.x - tmpAsteroid.x;
				var dY = tmpAsteroidB.y - tmpAsteroid.y;
				var distance = Math.sqrt((dX * dX) + (dY * dY));
				
				if(distance < tmpAsteroid.radius + tmpAsteroidB.radius)
				{
					var angle = Math.atan2(dY, dX);
					var sine = Math.sin(angle);
					var cosine = Math.cos(angle);
					
					//rotate asteroid position
					var x = 0;
					var y = 0;
					
					//rotate asteroidB position
					var xB = dX * cosine + dY * sine;
					var yB = dY * cosine - dX * sine;
					
					//rotate velocity
					var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
					var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;
					
					//rotate velocity asteroidB
					var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
					var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;
					
					//Conserver momentum
					var vTotal = vX - vXb;
					vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass);
					vXb = vTotal + vX;
					
					//Move asteroids apart
					xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);
					
					//Rotate asteroid positions back
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine);
					
					//Rotate asteroidB positions back
					tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine);
					tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine);
					
					//Rotate asteroid velocities back
					tmpAsteroid.vX = vX * cosine - vY * sine;
					tmpAsteroid.vY = vY * cosine + vX * sine;
					
					//Rotate asteroidB velocities back
					tmpAsteroidB.vX = vXb * cosine - vYb * sine;
					tmpAsteroidB.vY = vYb * cosine + vXb * sine;
				}
			}
			
			//calculate new position
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;
			
			//Add friction
			if(Math.abs(tmpAsteroid.vX) > 0.1)
			{
				tmpAsteroid.vX *= tmpAsteroid.friction;
			}
			else
			{
				tmpAsteroid.vX = 0;
			}
			
			if(Math.abs(tmpAsteroid.vY) > 0.1)
			{
				tmpAsteroid.vY *= tmpAsteroid.friction;
			}
			else
			{
				tmpAsteroid.vY = 0;
			}
			
			if(!tmpAsteroid.player)
			{
				var dXp = tmpAsteroid.x - platformX;
				var dYp = tmpAsteroid.y - platformY;
				var distanceP = Math.sqrt((dXp * dXp) + (dYp * dYp));
				if(distanceP > platformOuterRadius)
				{
					if(tmpAsteroid.radius > 0)
					{
						tmpAsteroid.radius -= 1;
					}
					else
					{
						deadAsteroids.push(tmpAsteroid);
					}
				}
			}
			
			context.beginPath()
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		}
		
		if(playGame)
		{
			if(deadAsteroids.length > 0)
			{
				for(var di = 0; di < deadAsteroids.length; di++)
				{
					var tmpDeadAsteroid = deadAsteroids[di];
					asteroids.splice(asteroids.indexOf(tmpDeadAsteroid), 1);
				}
				var remaining = asteroids.length - 1; //remove player count
				uiRemaining.html(remaining);
				
				if(remaining == 0)
				{
					//winner
					playGame = false;
					uiStats.hide();
					uiComplete.show();
					
					$(window).unbind('mousemove');
					$(window).unbind('mousedown');
					$(window).unbind('mouseup');	
				}
			}
			
			//run animation every 33 ms
			setTimeout(animate, 40);
		}
		
	};
	init();
	
	
	
	
	
});

	


function resizeCanvas()
{	
	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);

	canvasWidth = canvas.width();
	canvasHeight = canvas.height();
}	



