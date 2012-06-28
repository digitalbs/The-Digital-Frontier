<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Bio.aspx.cs" Inherits="DigitalFrontier.Bio" %>

<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>The Digital Frontier - Bio</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width">
    <link href='//fonts.googleapis.com/css?family=Dosis:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/style.css">
    <script src="js/libs/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="js/libs/utils.js" type="text/javascript"></script>
	<script src="js/libs/modernizr-2.5.3-respond-1.1.0.min.js" type="text/javascript"></script>
    <script src="js/home.js" type="text/javascript"></script>
    <script src="js/common.js" type="text/javascript"></script>
</head>
<body>
    <!-- background image for whole site -->
    <img src="Img/Background/digitalFrontier.jpg" alt="Digital Frontier" class="resizableBkgd" />
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

	<div id="header-container">
		<header class="wrapper clearfix">
			<h1 id="logo"><a href="Default.aspx">The Digital Frontier</a></h1>
            <section id="hdrRight">
				<h2 id="subtitle">My journey into the digital wilderness</h2>
				<ul id="socialLinks">
					<li><a href="http://www.linkedin.com/in/brianschneiders" target="_blank"><img src="img/logos/logoLinkedIn.png" width="25" alt="LinkedIn" /></a></li>
					<li><a href="https://twitter.com/#!/d1g1talfr0ntier" target="_blank"><img src="img/logos/logoTwitter.png"  width="25" alt="Twitter" /></a></li>
					<!--<li><a href=""><img src="img/logos/logoFacebook.png" alt="Facebook" /></a></li>-->
				</ul>
			</section>
			<nav>
				<ul>
					<li><a href="Blog.aspx">The Blog</a></li>
					<li><a href="Tutorials.aspx">Tutorials</a></li>
                    <li><a class="active" href="Bio.aspx">Bio</a></li>
					<li><a href="Contact.aspx">Contact</a></li>
				</ul>
			</nav>
		</header>
	</div>
	<div id="main-container">
		<div id="main" class="wrapper clearfix">
			
			<section id="left">
				<header>
					<h1>Bio...</h1>
				</header>
				<section id="bio">
                    <header>
                        <h1>I...</h1>
                        <h2 class="quote">Push the Envelope</h2>
                        <h3 class="left">Solve Problems</h3>
                        <h2 class="quote left">am Passionate</h2>
                        <h3 class="bold left">Influence Peers</h3>                    
                        <h3 class="left">am Open Minded</h3>
                        <h4 class="left">Collaborate</h4>
                    </header>
                    <article id="life">
                        <h4>Above is who I am in the most simpliest of terms.</h4>
                        <p>Ever since I can remember I've always had a passion of how things work. I would break an item down and put it back together just to see how everything worked.
                        Over the years, I've used this curosity as a skill in my day to day learning in life, as well as my professional career developing for the digital landscape. I didn't come from a technical background, but I got here as fast as I could.</p>
                        <p></p>
                    </article>
                </section>
			</section>
	
            <aside id="twitterFeed">
				<h2>Twitter Feed <img src="img/logos/twitter_blue_logo.png" alt="Twitter" /></h2>
				<ul>
                    <!-- Twitter Feed Here -->
                </ul>
                <a id="viewmoretweets" href="http://twitter.com/d1g1talfr0ntier/" target="_blank">view more</a>
                <%--<%= post %>--%>
			</aside>

		</div> <!-- #main -->

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

<script src="js/script.js"></script>
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
