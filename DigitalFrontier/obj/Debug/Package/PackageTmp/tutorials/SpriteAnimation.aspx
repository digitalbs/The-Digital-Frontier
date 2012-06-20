<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SpriteAnimation.aspx.cs" Inherits="DigitalFrontier.tutorials.SpriteAnimation" %>

<!DOCTYPE html>

<html>
<head>
    <title></title>
    <script type="text/javascript" src="../js/libs/easeljs-0.4.2.min.js"></script>
    <script type="text/javascript" src="../js/libs/jquery-1.7.2.min.js"></script>
</head>
<body>
    <canvas id="main"></canvas>
    <a href="javascript:void(0);" onclick="init()">Click</a>
    <script type="text/javascript">
        

        var canvas = $('#main'),
            stage = new Stage(canvas),
            screen_width,
            screen_height,
            bmpAnimation;

        var imgMonsterARun = new Image();

        function init() {
            canvas.width = $(window).width();
            canvas.height = $(window).height();
            imgMonsterARun.onload = handleImageLoad;
            imgMonsterARun.onerror = handleImageError;
            imgMonsterARun.src = "images/MonsterARun.png";
        }

        function reset() {
            stage.removeAllChildren();
            Ticker.removeAllListeners();
            stage.update();
        }

        function handleImageLoad(e) {
            startGame();
        }

        function startGame() {
            // grab canvas width and height for later calculations:
            screen_width = canvas.width;
            screen_height = canvas.height;

            // create spritesheet and assign the associated data.
            var spriteSheet = new SpriteSheet({
                // image to use
                images: [imgMonsterARun],
                // width, height & registration point of each sprite
                frames: { width: 64, height: 64, regX: 32, regY: 32 },
                animations: {
                    walk: [0, 9, "walk"]
                }
            });

            // create a BitmapAnimation instance to display and play back the sprite sheet:
            bmpAnimation = new BitmapAnimation(spriteSheet);

            // start playing the first sequence:
            bmpAnimation.gotoAndPlay("walk"); 	//animate

            // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
            // of animated rats if you disabled the shadow.
            bmpAnimation.shadow = new Shadow("#454", 0, 5, 4);

            bmpAnimation.name = "monster1";
            bmpAnimation.direction = 90;
            bmpAnimation.vX = 4;
            bmpAnimation.x = 16;
            bmpAnimation.y = 32;

            // have each monster start at a specific frame
            bmpAnimation.currentFrame = 0;
            stage.addChild(bmpAnimation);

            // we want to do some work before we update the canvas,
            // otherwise we could use Ticker.addListener(stage);
            Ticker.addListener(window);
            Ticker.useRAF = true;
            // Best Framerate targeted (60 FPS)
            Ticker.setFPS(60);
        }

        //called if there is an error loading the image (usually due to a 404)
        function handleImageError(e) {
            console.log("Error Loading Image : " + e.target.src);
        }

        function tick() {
            // Hit testing the screen width, otherwise our sprite would disappear
            if (bmpAnimation.x >= screen_width - 16) {
                // We've reached the right side of our screen
                // We need to walk left now to go back to our initial position
                bmpAnimation.direction = -90;
            }

            if (bmpAnimation.x < 16) {
                // We've reached the left side of our screen
                // We need to walk right now
                bmpAnimation.direction = 90;
            }

            // Moving the sprite based on the direction & the speed
            if (bmpAnimation.direction == 90) {
                bmpAnimation.x += bmpAnimation.vX;
            }
            else {
                bmpAnimation.x -= bmpAnimation.vX;
            }

            // update the stage:
            stage.update();
        }



    </script>
</body>
</html>
