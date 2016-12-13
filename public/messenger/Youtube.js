/* global console, _, $, YT, YouTube*/

window.YouTube = function() {
  //return as class if called as function
  if(!(this instanceof YouTube)) {
    return new YouTube();
  }
  // All local class variables will begin with underscore '_'
  var self = this;
  //defaults settings for sound cloud widget
  var _playerDom = false; //iframe dom
  var _player  = false; //youtube embeded instance
  var _uri     = false;
  var _playing = false;
  var _videoId = false;
  var _done    = false;
  var _options = {
    auto_play:      1,
    controls:       0,
    autohide:       1,
    wmode:          'opaque',
    disablekb:      1, //diable keyboard controls
    fs:             0, //full screen button param
    modestbranding: 1
  };
  _apiKey = 'AIzaSyChicIwpV9J2orw3ffLqmtdgZnukIdVd1o';

  var onPlay =  function() {
    console.log('playback started');
    _playing = true;
  };
  var onPause =  function() {
    console.log('playback paused');
    _playing = false;
  };
  var onFinished =  function() {
    console.log('playback finished');
    _playing = false;
  };
  self.init = function(playerID, _videoId) {
    //if current track already slectled
    if(_trackId === trackId) {
      self.togglePlayback();
      return;
    }
    //set track ID
    _trackId = trackId;
    _uri = 'http://api.soundcloud.com/tracks/' + _trackId;
    //get dom of iframe player
    var qryString = '#' + playerID;
    _playerDom = $(qryString);
    _playerDom.attr('src', 'https://w.soundcloud.com/player/?url=');
    //setting iframe source
    //var srcUrl = getPlayerUrl();
    //_playerDom.attr('src', srcUrl);
    //we will be attaching to player by Dom and binding events
    //bindings for player events
    //wait for iframe to load first
    try {
      _player = new YT.Player('player', {
          height: '135',
          width: '240',
          videoId: 'i8IXMGHpGBk',
          playerVars: _options,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
          }
    });
    } catch (e) {
      console.log('failed to attach to shadowPlayer' + e);
      return false;
    }


    function onYouTubeIframeAPIReady() {

    }
    function onPlayerReady(evt) {
      evt.target.playVideo();
    }
    function onPlayerStateChange(evt) {
      if (evt.data == YT.PlayerState.PLAYING) {
        _playing = true;
      } else {
        _playing = false;
      }
    }
    function stopVideo() {

    }


 };
////////////////////////////////////////////////////////////////////////////////
/// Toggle Volume Method
////////////////////////////////////////////////////////////////////////////////
  self.toggleAudio = function() {
    _player.getVolume(function(volume) {
      console.log('current volume - ' + volume);
      var newVolume = 0;
      if(volume !== 0) {
        newVolume = 100;
      }
      else {
        newVolume = 0;
      }
      //trigger API
      _player.setVolume(newVolume);
    });
  };
////////////////////////////////////////////////////////////////////////////////
/// Toggle Playback Method
////////////////////////////////////////////////////////////////////////////////
  self.togglePlayback = function() {
    //player variable changed automatically with event handler
    console.log('_playing - ' + _playing);
    if(_playing) {
      player.stopVideo();
    } else {
      _player.play();
    }
  };
////////////////////////////////////////////////////////////////////////////////
/// search SoundCloud Tracks Method
////////////////////////////////////////////////////////////////////////////////
  self.searchForTrack = function(searchString, callbackFunction) {
    var searchResultsArray = [{
      title: ('No results found for' + searchString)
    }];
    var resDefaults = {
      title : false,
      smlImage: false,
      medImageUrl: false,
      lrgImageUrl: false,
      resourceID : false,
      canStream : false,
      link : false,
      playCount : false,
      waveformUrl : false
    };

    var youtube_url= 'https://www.googleapis.com/youtube/v3/';
    var youtube_key= 'AIzaSyA25ISk8gdpn4md-gCNR2p_GH7z3KzgqKA';
    //https://code.google.com/apis/console/
    var videos="";

    function searchVideos(keyword) {
        var method = 'search';

    $.ajax({
           type: 'GET',
     dataType :'jsonp',
     url : youtube_url+method+"?part=snippet&q="+keyword+"&type=videos"+"&key="+youtube_key,
     success : function(json) {
            if(json) {
                  videos = json;
                        progressbar("20");
            }
     }
    });
}

function searchVideosNumber() {
    if(videos!=="") {return videos.pageInfo.totalResults;}
    else return "0";
}


    // see https://developers.soundcloud.com/docs/api/reference#tracks
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks',
      {
        q: searchString,
        limit: 10
      },
      function(tracks, error) {
        //check for errors
        if (error) {
          console.log('Error: ' + error.message);
        }
        //if no errors print out trank results
        else {
          if(tracks.length){
            searchResultsArray= [];
          }
          var resDefaults = {
            title : false,
            smlImage: false,
            medImageUrl: false,
            lrgImageUrl: false,
            resourceID : false,
            canStream : false,
            link : false,
            playCount : false,
            waveformUrl : false
          };
          _.each(tracks, function(res) {
            var resourceID, smallImage, largeImage;
            var tempResult = {};
            if(res.uri) {
              // sample uri
              // https://api.soundcloud.com/tracks/137434499
              var urlStr = res.uri;
              var tempArr = urlStr.split('/');
              resourceID = tempArr.pop();
            }
            if(res.artwork_url) {
              // get tiny version of album artwork
              // large version is loaded by defaults
              smallImage = res.artwork_url.replace('large', 'badge');
              largeImage = res.artwork_url.replace('large', 't500x500');
            }
            tempResult = {
              title : (res.title || false),
              smlImage: (smallImage || false),
              medImageUrl: (res.artwork_url || false),
              lrgImageUrl: (largeImage || false),
              resourceID : (resourceID || false),
              canStream : (res.streamable || false),
              link : (res.permalink_url || false),
              playCount : (res.playback_count || false),
              waveformUrl : (res.uri || false)
            };

            //fill in undefined with false
            tempResult = _.defaults(tempResult, resDefaults);
            console.log(tempResult);
            /*
            console.log('embeddable_by ' + res.embeddable_by);
            console.log('permalink_url ' + res.permalink_url);
            console.log('playback_count ' + res.playback_count);
            console.log('sharing ' + res.sharing);
            console.log('streamable ' + res.streamable);
            console.log('title ' + res.title);
            console.log('uri ' + res.uri);
            console.log('waveform_url ' + res.uri);
            */
            if(tempResult.canStream) {
              searchResultsArray.unshift(tempResult);
            }
          });
        }
        callbackFunction(searchResultsArray);
    }); //end of get /tracks call

  };


};
