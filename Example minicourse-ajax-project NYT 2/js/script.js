function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes using AJAX
  //old  var keyNYT = '020cabcb3a92b8c411f8f88110edb095:13:38869805';
    var keyNYT = 'c07dd24a9be14a27a450d6394973776e';
    //var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=Columbus+Ohio&begin_date=20150101&end_date=20160101&sort=newest&api-key=020cabcb3a92b8c411f8f88110edb095%3A13%3A38869805';
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch/json?q='+ cityStr + '&sort=newest&api-key=020cabcb3a92b8c411f8f88110edb095:13:38869805';

    // YOUR CODE GOES HERE!
    //The pattern is jQuery.getJSON( url [, data ] [, success ] )

    $.getJSON( nytURL, function (data) {
    console.log(data);
    $nytHeaderElem.text('New York Times Articles' + cityStr);
    articles = data.response.docs;
    for (var i = 0; i < articles.length; i++)
        {var article = articles [i];
        $nytElem.append('<li class = "article">' + '<a href ="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };
    })
    .error(function (e) {$nytHeaderElem.text('New York Times Articles could not be loaded for'
        + cityStr);});


   // var wikiURL='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
   var wikiURL='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    console.log(cityStr, wikiURL);
    $.ajax({
        url: wikiURL,
        dataType:"jsonp",
        jsonp: "callback",
        success: function(response) {
            var articleList = response [1];
            console.log(articleList);
            for (var i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
               console.log(articleStr);
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
            }
        });

 return false;
};

$('#form-container').submit(loadData);



/*http://www.npr.org/player/v2/mediaPlayer.html?action=1&t=1&islist=false&id=459100751&m=459250066
housing first....
*/