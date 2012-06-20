//globally set the canvas context
var canvas; 
var context; 

$(function(){
	canvas = $("#animation");
	context = canvas.get(0).getContext("2d");

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var playAnimation = true;

	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
	
	startButton.hide();
	startButton.click(function(){
		$(this).hide();
		stopButton.show();
		
		playAnimation = true;
		
		//do animation
		animate();		
	});
	
	stopButton.click(function(){
		$(this).hide();
		startButton.show();
		
		playAnimation = false;
	});
	
	/*
	//Circle Animate
	var Shape = function(x, y)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;
		
		this.radius = Math.random() * 30;
		this.angle = 0;	
	};
	
	var shapes = new Array();
	

	for(var i=0; i <30; i++)
	{
		var x = Math.random() * canvasWidth;
		var y = Math.random() * canvasHeight;
		var width = height = Math.random() * 50;
		shapes.push(new Shape(x, y, width, height));
	}
	
	function animate()
	{
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		for(var i= 0; i < shapes.length; i ++)
		{
			var tmpShape = shapes[i];
			var x = tmpShape.x + (tmpShape.radius*Math.cos(tmpShape.angle*(Math.PI/180)));
			var y = tmpShape.y + (tmpShape.radius*Math.sin(tmpShape.angle*(Math.PI/180)));
			
			tmpShape.angle += 1;
			if(tmpShape.angle > 360)
			{
				tmpShape.angle = 0;
			}
			//tmpShape.x += Math.random() * 4-2;
			//tmpShape.y += Math.random() * 4-2;
			context.fillRect(x, y, tmpShape.width, tmpShape.height);
		}
	
		if(playAnimation)
		{			
			setTimeout(animate, 30);		
		}
	};
	animate();
	*/
	
	
	//boundry Animate
	var Shape = function(x, y)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;
		
		this.reverseX = false;
		this.reverseY = false;
	};
	
	var shapes = new Array();
	

	for(var i=0; i <30; i++)
	{
		var x = Math.random() * canvasWidth;
		var y = Math.random() * canvasHeight;
		var width = height = Math.random() * 50;
		shapes.push(new Shape(x, y, width, height));
	}
	
	function animate()
	{
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		for(var i= 0; i < shapes.length; i ++)
		{
			var tmpShape = shapes[i];
			
			if(!tmpShape.reverseX)
			{
				tmpShape.x += 2;
			}
			else
			{
				tmpShape.x -= 2;
			}
			
			if(!tmpShape.reverseY)
			{
				tmpShape.y += 2;
			}
			else
			{
				tmpShape.y -= 2;
			}
			
			context.fillRect(tmpShape.x, tmpShape.y, tmpShape.width, tmpShape.height);
			
			if(tmpShape.x < 0)
			{
				tmpShape.reverseX = false;
			}
			else if(tmpShape.x + tmpShape.width > canvasWidth)
			{
				tmpShape.reverseX = true;
			}
			
			if(tmpShape.y < 0)
			{
				tmpShape.reverseY = false;
			}
			else if(tmpShape.y + tmpShape.height > canvasHeight)
			{
				tmpShape.reverseY = true;
			}
		}
	
		if(playAnimation)
		{			
			setTimeout(animate, 30);		
		}
	};
	animate();
	
});

$(window).resize(function(){
	
	//do animation
	
});



