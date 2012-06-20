//globally set the canvas context
var canvas; 
var context; 
var isCircular;
var video;

$(function(){
	canvas = $("#videoCanvas");
	context = canvas.get(0).getContext("2d");
	
	//video player functionality
	video = $('#videoPlayer');
	
	video.hide();

	drawVideo();

	
	
	
	$('#stop').click(function(){
		video.get(0).pause();
	});		
	


	$('#btnResetImage').click(drawVideo);

	$('#btnInvertColor').click(invertColor);
	
	$('#btnGrayscale').click(grayscale);

	$('#btnSaveImage').click(function(){
		saveImage();
		
	});

	$('#pixelCalculator').submit(function(){
		var pixelCount = $('#inputPixels').val();
		if(pixelCount != "")
		{
			isCircular = $('#chckCircular:checked').is(':checked');
			pixelateVideo($('#pixelNumber').val(), isCircular);	
			$('#pixelNumber').val(parseInt(pixelCount));
		}
		else
		{
			alert('empty');
		}
		return false;
	});
	
	$('#play').bind('click',function(){
		var pixelCount = $('#inputPixels').val();
		video.get(0).play();
		if(pixelCount != "")
		{
			isCircular = $('#chckCircular:checked').is(':checked');
			pixelateVideo($('#pixelNumber').val(), isCircular);	
			$('#pixelNumber').val(parseInt(pixelCount));
		}
		return false;
	});
});

$(window).resize(function(){
	drawVideo();
	if($('#pixelNumber').val() == "")
	{
		return false;
	}
	else
	{
		pixelateVideo($('#pixelNumber').val(), isCircular);	
	}
	
});

function drawVideo()
{
	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);
	
	var videoHeight = (canvas.height()/canvas.width()) * canvas.width();
	var videoWidth = canvas.width();
	
	if(video.paused || video.ended)
	{
		return false;
	}
	context.drawImage(video.get(0), 0, 0, videoWidth, videoHeight);
	setTimeout(drawVideo, 20);
}

function invertColor()
{
	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);
	
	var imageHeight = (canvas.height()/canvas.width()) * canvas.width();
	var imageWidth = canvas.width();
	var image = new Image();
	image.src = "Images/alixIJeep.jpg";
	
	$(image).load(function(){
		context.drawImage(image, 0, 0, imageWidth, imageHeight);
		var imageData = context.getImageData(0, 0, canvas.width(), canvas.height());
		var pixels = imageData.data;
		var numPixels = pixels.length;
		
		context.clearRect(0, 0, canvas.width(), canvas.height());
		
		for(var i = 0; i <numPixels; i++)
		{
			pixels[i*4] = 255-pixels[i*4];
			pixels[i*4+1] = 255 - pixels[i*4+1];
			pixels[i*4+2] = 255 - pixels[i*4+2];
		}
		context.putImageData(imageData, 0, 0);
	});
}

function grayscale()
{
	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);
	
	var imageHeight = (canvas.height()/canvas.width()) * canvas.width();
	var imageWidth = canvas.width();
	var image = new Image();
	image.src = "Images/alixIJeep.jpg";
	
	$(image).load(function(){
		context.drawImage(image, 0, 0, imageWidth, imageHeight);
		var imageData = context.getImageData(0, 0, canvas.width(), canvas.height());
		var pixels = imageData.data;
		var numPixels = pixels.length;
		
		for(var i=0; i<numPixels; i++)
		{
			var average = (pixels[i*4]+pixels[i*4+1]+pixels[i*4+2])/3;
			pixels[i*4] = average;
			pixels[i*4+1] = average;
			pixels[i*4+2] = average;
		}
		context.putImageData(imageData, 0, 0);
	});
}

function pixelateVideo(numberOfPixels, isCircular)
{
	canvas.attr('width', $(window).get(0).innerWidth);
	canvas.attr('height', $(window).get(0).innerHeight);
	
	var videoHeight = (canvas.height()/canvas.width()) * canvas.width();
	var videoWidth = canvas.width();	

	var numOfPixels = Math.ceil(numberOfPixels/2);
	
	if(video.paused || video.ended)
	{
		return false;
	}
	
	context.drawImage(video.get(0), 0, 0, videoWidth, videoHeight);
		
	var imageData = context.getImageData(0, 0, canvas.width(), canvas.height());
	var pixels = imageData.data;
	
	context.clearRect(0, 0, canvas.width(), canvas.height());
	
	var numTileRows = numOfPixels;
	var numTileCols = numOfPixels;
	
	var tileWidth = imageData.width/numTileCols;
	var tileHeight = imageData.height/numTileRows;
	
	for(var r = 0; r < numTileRows; r++)
	{
		for(var c = 0; c < numTileCols; c++)
		{
			var x = (c * tileWidth) + (tileWidth/2);
			var y = (r * tileHeight) + (tileHeight/2);
			var pos = (Math.floor(y) * (imageData.width*4)) + (Math.floor(x)*4);
			
			var red = pixels[pos];
			var green = pixels[pos+1];
			var blue = pixels[pos+2];
			
			context.fillStyle = "rgb(" + red+", "+ green+", "+ blue+")";
			if(isCircular)
			{
				context.beginPath();
				context.arc(x, y, tileWidth/2, 0, Math.PI*2, false);
				context.closePath();
				context.fill();
			}
			else
			{
				context.fillRect(x-(tileWidth/2), y-(tileHeight/2), tileWidth, tileHeight);	
			}
			
		}
		setTimeout(function(){
			pixelateVideo(numberOfPixels, isCircular);
		}, 30);
	}
		
	
}

function saveImage()
{
	var dataURL = canvas.get(0).toDataURL();
	var img = $("<img></img>");
	img.attr("src", dataURL);
	canvas.replaceWith(img);
}
