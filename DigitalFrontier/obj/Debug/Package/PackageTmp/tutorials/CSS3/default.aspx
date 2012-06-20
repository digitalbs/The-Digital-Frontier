<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <!-- Basic Stuff -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <title>CSS APP Tutorial</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link rel="Stylesheet" href="css/reset.css" />
    <link rel="Stylesheet" href="css/animate.css" />
    <link rel="Stylesheet" href="css/style.css" />

</head>
<body>
        <section id="container">
            <nav>
                <ul class="menu">
                    <li><a href="#">My dashboard</a></li>
                    <li><a href="#">Likes</a></li>
                    <li><a href="#">Views</a>
                        <ul>
                            <li><a href="#">Documents</a></li>
                            <li><a href="#">Messages</a></li>
                            <li><a href="#">Sign Out</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Uploads</a></li>
                    <li><a href="#">Video</a></li>
                    <li><a href="#">Demo</a></li>
                </ul>
            </nav>
            <header>
                <h1>App</h1>
            </header>
            <p>Why Should you subscribe?</p>

            <section id="accordion">
                <div>
                    <input type="checkbox" id="ac-1" />
                    <label for="ac-1">One</label>
                    <article>
                        <p>Test accordion 1</p>
                    </article>
                </div>
                <div>
                    <input type="checkbox" id="ac-2" />
                    <label for="ac-2">Two</label>
                    <article>
                        <p>Test accordion 2</p>
                    </article>
                </div>
                <div>
                    <input type="checkbox" id="ac-3" />
                    <label for="ac-3">Three</label>
                    <article>
                        <p>Test accordion 3</p>
                    </article>
                </div>
                <div>
                    <input type="checkbox" id="ac-4" />
                    <label for="ac-4">Four</label>
                    <article>
                        <p>Test accordion 4</p>
                    </article>
                </div>

            </section>

            <article id="form">
                <input type="email" placeholder="email address" />
                <input type="submit" value="submit" />
            </article>
        </section>
</body>
</html>
