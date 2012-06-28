var tCount = 1;
$(function () {
    $('.blogPost img').each(function () {
        if ($(this).attr('src') == "https://blogger.googleusercontent.com/tracker/6246232948772058170-8553335974033452664?l=the-digital-frontier.blogspot.com") {
            $(this).hide();
        }
    });

    //load twitter feed
    getTweets();

    //onclick, get more tweets
    $('#viewmoretweets').click(getTweets);
});

function getTweets() {
    $.getJSON('https://twitter.com/status/user_timeline/d1g1talfr0ntier.json?count=3&page=' + tCount + '&callback=?', function (data) {
        $.each(data, function (i) {
            var date = H(data[i].created_at);
            $('#twitterFeed ul').append('<li><a href="http://twitter.com/d1g1talfr0ntier/statuses/' + data[i].id_str + '" class="twuser" target="_blank">d1g1talfr0ntier</a><br/>' + data[i].text + '<br/><a href="http://twitter.com/d1g1talfr0ntier/statuses/' + data[i].id_str + '" target="_blank" class="twtime">' + date + '</a></li>');
        });
        tCount++;
    });
}

var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
} ();

var H = function (a) {
    var b = new Date();
    var c = new Date(a);
    if (K.ie) {
        c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
    }
    var d = b - c;
    var e = 1000,
				minute = e * 60,
				hour = minute * 60,
				day = hour * 24,
				week = day * 7;
    if (isNaN(d) || d < 0) {
        return ""
    }
    if (d < e * 7) {
        return "right now"
    }
    if (d < minute) {
        return Math.floor(d / e) + " seconds ago"
    }
    if (d < minute * 2) {
        return "about 1 minute ago"
    }
    if (d < hour) {
        return Math.floor(d / minute) + " minutes ago"
    }
    if (d < hour * 2) {
        return "about 1 hour ago"
    }
    if (d < day) {
        return Math.floor(d / hour) + " hours ago"
    }
    if (d > day && d < day * 2) {
        return "yesterday"
    }
    if (d < day * 365) {
        return Math.floor(d / day) + " days ago"
    } else {
        return "over a year ago"
    }
};