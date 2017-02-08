import { YoutubeSearch } from './Youtube/YoutubeSearch';
import * as _ from 'lodash';
import * as $ from 'jquery';

let googleApiClientReady = function() {
    const key = 'AIzaSyBlbo40yYWavEFfzLVmQP0Kjb2QKeh9f8w';
    // let yt = new YoutubeVideo('casper-media');
    let ys = new YoutubeSearch(key);
    ys.searchByKeyword('macross plus voices')
        .then(function(v: Object) {
            console.log(v);
        });
};
