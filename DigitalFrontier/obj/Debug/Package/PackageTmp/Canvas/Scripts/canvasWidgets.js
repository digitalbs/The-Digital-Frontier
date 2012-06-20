canvas.click(function(e){
		var canvasOffset = canvas.offset();
		var canvasX = Math.floor(e.pageX - canvasOffset.left);
		var canvasY = Math.floor(e.pageY - canvasOffset.top);
		
		var imageData = context.getImageData(canvasX, canvasY, 1, 1);
		
		var pixel = imageData.data;
		var pixelColor = "rgb("+ pixel[0] +", "+pixel[1]+", "+ pixel[2] + ")";
		
		$('#pixelColor span').html(pixelColor);
	});