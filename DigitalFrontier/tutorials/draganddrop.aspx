<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="draganddrop.aspx.cs" Inherits="DigitalFrontier.tutorials.draganddrop" %>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>The Digital Frontier - Tutorial - Drag and Drop</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width">
    <link href='//fonts.googleapis.com/css?family=Dosis:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/css/style.css">
    <script src="/js/libs/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="/js/libs/utils.js" type="text/javascript"></script>
	<script src="/js/libs/modernizr-2.5.3-respond-1.1.0.min.js" type="text/javascript"></script>
    <script src="/js/home.js" type="text/javascript"></script>
    <script src="/js/common.js" type="text/javascript"></script>
    <link type="text/css" rel="Stylesheet" href="/css/sh/shCore.css" />
    <link type="text/css" rel="Stylesheet" href="/css/sh/shThemeRDark.css" />
    <script src="/js/libs/sh/XRegExp.js" type="text/javascript"></script>
    <script src="/js/libs/sh/shCore.js" type="text/javascript"></script>
    <script src="/js/libs/sh/shBrushJScript.js" type="text/javascript"></script>
    <script src="/js/libs/sh/shBrushCSharp.js" type="text/javascript"></script>
    <script type="text/javascript">        SyntaxHighlighter.all();</script>
</head>
<body>
    <!-- background image for whole site -->
    <img src="/Img/Background/digitalFrontier.jpg" alt="Digital Frontier" class="resizableBkgd" />
<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

	<div id="header-container">
		<header class="wrapper clearfix">
			<h1 id="logo"><a href="/Default.aspx">The Digital Frontier</a></h1>
            <section id="hdrRight">
				<h2 id="subtitle">My journey into the digital wilderness</h2>
				<ul id="socialLinks">
					<li><a href="http://www.linkedin.com/in/brianschneiders" target="_blank"><img src="/img/logos/logoLinkedIn.png" width="25" alt="LinkedIn" /></a></li>
					<li><a href="https://twitter.com/#!/d1g1talfr0ntier" target="_blank"><img src="/img/logos/logoTwitter.png"  width="25" alt="Twitter" /></a></li>
					<!--<li><a href=""><img src="img/logos/logoFacebook.png" alt="Facebook" /></a></li>-->
				</ul>
			</section>
			<nav>
				<ul>
					<li><a href="/Blog.aspx">The Blog</a></li>
					<li><a class="active" href="/Tutorials.aspx">Tutorials</a></li>
                    <li><a href="/Bio.aspx">Bio</a></li>
					<li><a href="/Contact.aspx">Contact</a></li>
				</ul>
			</nav>
		</header>
	</div>
	<div id="main-container">
		<div id="main" class="full wrapper clearfix">
			<header>
                <h1>Drag and Drop Tutorial</h1>
            </header>
            <section id="full">
				<h2>Lets start with the caveats...</h2>
                <article>
                    <h3>Lack of browser support</h3>
                    <p>The Drag and drop support is lacking as of current. If we only want to support webkit and mozilla browsers, than this is something we can implement without the use of polyfills (<a href="#" title="A shim that mimics a future API providing fallback functionality to older browsers.">what's a polyfill?</a></p>
                </article>
                <article>
                    <h3>The Layout | HTML/CSS</h3>
                    <p>In a Section tag, let's add an unordered list:</p>
                    <pre class="brush: c#">
                        <section id="full">
				            <h2>Rank your favorite Music?</h2>
                            <ul id="qMusic">
                                <!-- Enter Code Here -->
                            </ul>
			            </section>
                    </pre>
                    <p>Now, we will add our list items to drag and drop. There are two important attributes we will need to add to our list items to make our items draggable. The two attributes we will be adding are <b>draggable</b> and <b>data-value</b>.</p>
                    <p>Here it is in action: </p>
                    <pre class="brush: c#">
                        <section id="full">
				            <h2>Rank your favorite Music?</h2>
                            <ul id="qMusic">
                                <li draggable="true" data-value="music-indie">Indie</li>
                                <li draggable="true" data-value="music-rap">Rap</li>
                                <li draggable="true" data-value="music-rock">Rock</li>
                                <li draggable="true" data-value="music-dubstep">DubStep</li>
                            </ul>
			            </section>
                    </pre>
                    <p>Let's breakdown these two attributes. The <b>draggable</b> attribute takes a boolean of true or false. If we set this to True, the item is now draggable.</p>
                </article>
                
                <article>
                    <h3>The Functionality | Javascript</h3>
                    <p>Looks great, put it doesn't quite work yet. What a drag...good thing it just takes a little javascript to make it work, so lets drop that in now.</p>
                    <p>First things first. Let's see if our browser supports it. With implementing any of our HTML5 Elements, we detect it with <b>Modernizr</b>.</p>
                    <pre class="brush: js">
                        if (Modernizr.draganddrop) {
                            //do drag and drop here
                        }
                        else
                        {
                            //add a polyfill to address the lack of drag and drop support
                        }
                    </pre>
                    <p>Now, lets create a variable of the item that we will drag.</p>
                    <pre class="brush: js">
                        if (Modernizr.draganddrop) {
                            var dragSrcEl = null;
                        }
                    </pre>
                </article>


                <pre class="brush: js">
                    if (Modernizr.draganddrop) {

                        var dragSrcEl = null;

                        function handleDragStart(e) {
                            this.style.opacity = '0.4';

                            dragSrcEl = this;
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/html', this.innerHTML);
                        }

                        function handleDragOver(e) {
                            if (e.preventDefault) {
                                e.preventDefault(); //Need to drop element
                            }

                            e.dataTransfer.dropEffect = 'move';  //transfer data
                            return false;
                        }

                        function handleDrop(e) {
                            if (e.stopPropagation) {
                                e.stopPropagation();
                                e.preventDefault();
                            }

                            var files = e.dataTransfer.files;
                            for (var i = 0, f; f = files[i]; i++) {
                                alert(f);
                            }

                            if (dragSrcEl != this) {
                                dragSrcEl.innerHTML = this.innerHTML;
                                this.innerHTML = e.dataTransfer.getData('text/html');
                            }

                            return false;
                        }

                        function handleDragEnd(e) {
                            [ ].forEach.call(cols, function (col) {
                                col.classList.remove('over');
                                col.style.opacity = "1";
                            });
                        }

                        function handleDragEnter(e) {
                            this.classList.add('over');  //add class over to dragged item
                        }

                        function handleDragLeave(e) {
                            this.classList.remove('over');  //add class over to dragged item
                        }

                        var cols = document.querySelectorAll('#full li');
                        [ ].forEach.call(cols, function (col) {
                            col.addEventListener('dragstart', handleDragStart, false);
                            col.addEventListener('dragover', handleDragOver, false);
                            col.addEventListener('dragenter', handleDragEnter, false);
                            col.addEventListener('dragleave', handleDragLeave, false);
                            col.addEventListener('drop', handleDrop, false);
                            col.addEventListener('dragend', handleDragEnd, false);
                        });
                    }
                    else {
                    }
                </pre>
                <p><a href="HTML5/DragandDrop.aspx">View Demo</a></p>
			</section>
		</div> 

        <footer class="wrapper">
			<nav>
                <ul>
                    <li>The-Digital-Frontier - 2012</li>
                </ul>
            </nav>
		</footer>
	</div> <!-- #main-container -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>    window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>

<script>
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-32894439-1']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
</script>

</body>
</html>