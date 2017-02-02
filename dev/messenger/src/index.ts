import YoutubeVideo     from './YoutubeVideo';
import YoutubeSearch    from './YoutubeSearch';
import $ = require('jquery');

$(function() {
const key = 'AIzaSyChicIwpV9J2orw3ffLqmtdgZnukIdVd1o';
    let yt = new YoutubeVideo('casper-media');
    let ys = new YoutubeSearch(key);
    ys.searchByKeyword('macross plus voices')
        .then(function(v: Object) {
            console.log(v);
        });
});