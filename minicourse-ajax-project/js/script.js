
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', '+ cityStr;
    //var key = '&key=AIzaSyDJMhQ7P8ZFGgEZltC-FyH7_6kw_elYwjU';

    $greeting.text('So you want to live at ' + address + '?');
    //var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location= ' + address + '';
    //$body.append('<img class= "bgimg" src"' + streetviewUrl +'">');
     $body.append('<img class ="bgimg" src=https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '">');
   return false;
};


$('#form-container').submit(loadData);


// loadData();
