/* global console, _, $, SC,
SoundCloudPlayer, SoundCloudSearch,
gCasperPlayer
*/

function SoundCloudPlayer(playerId, trackId) {
  gCasperPlayer.hide();
  //return as class if called as function
  if(!(this instanceof SoundCloudPlayer)) {
    return new SoundCloudPlayer();
  }
  // All local class variables will begin with underscore '_'
  var self = this;
  //////////////////////////////////////////////////////////////////////////////
  /// SoundCloud PLayer Parameters
  //////////////////////////////////////////////////////////////////////////////
  //defaults settings for sound cloud widget
  var _playerDom = false; //iframe dom
  var _player  = false; //SoundCloud widget instance
  var _uri     = false;
  var _playing = false;
  var _trackId = false;
  var _options = {
    auto_play:      true,
    buying:         false,
    liking:         false,
    download:       false,
    sharing:        false,
    show_artwork:   true,
    show_comments:  false,
    show_playcount: false,
    show_user:      false,
    start_track:    0
  };
  var getPlayerUrl = function() {
    //sample URL
    //<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/89201481&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
    //return encoded URL from url param of widget
    var url =
      'https://w.soundcloud.com/player/?url=';

    var urlParam = 'https://api.soundcloud.com/tracks/' +
      _trackId + '&' +
      'auto_play=' + _options.auto_play + '&' +
      'hide_related=' + _options.auto_play + '&' +
      'show_comments=' + _options.show_comments + '&' +
      'show_user=' + _options.show_user  + '&' +
      'show_playcount=' + _options.show_playcount  + '&' +
      'show_bpm=false&' +
      'sharing=' + _options.sharing + '&' +
      'show_artwork=' + _options.show_artwork  + '&' +
      'buying=' + _options.buying  + '&' +
      'download=' + _options.download  + '&' +
      'show_reposts=' + _options.auto_play + '&' +
      'visual=' + _options.show_artwork + '&' +
      'color=03A9F4&' +
      'liking=' + _options.liking + '&' +
      'allowtransparency=true&' +
      'hide_related=true';
    url += _.escape(urlParam);
    return url;
  };
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
    gCasperPlayer.clear();
  };
  var load = function(playerId, trackId) {
    //if current track already slectled
    if(_trackId === trackId) {
      self.togglePlayback();
      return;
    }
    //set track ID
    _trackId = trackId;
    _uri = 'http://api.soundcloud.com/tracks/' + _trackId;
    //get dom of iframe player
    _playerDom = $('#'+playerId);
    _playerDom.attr('src', '//w.soundcloud.com/player/?url=');
    //setting iframe source

    //var srcUrl = getPlayerUrl();
    //_playerDom.attr('src', srcUrl);
    //we will be attaching to player by Dom and binding events
    //bindings for player events
    //wait for iframe to load first
    try {
      _player = SC.Widget(playerId);
      _player.load(_uri, _options );
    } catch (e) {
      console.log('failed to attach to casperPlayer' + e);
      return false;
    }

    _player.bind(SC.Widget.Events.READY, function() {
      _player.bind(SC.Widget.Events.FINISH, onFinished);
      _player.bind(SC.Widget.Events.PAUSE, onPause);
      _player.bind(SC.Widget.Events.PLAY, onPlay);
      gCasperPlayer.show();
    });
  };
  //////////////////////////////////////////////////////////////////////////////
  /// Toggle Volume Method
  //////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////
  /// Toggle Playback Method
  //////////////////////////////////////////////////////////////////////////////
  self.togglePlayback = function() {
    //player variable changed automatically with event handler
    console.log('_playing - ' + _playing);
    if(_playing) {
      _player.pause();
    } else {
      _player.play();
    }
  };
  //load on creation
  load(playerId, trackId);
}

////////////////////////////////////////////////////////////////////////////////
/// Sound Cloud Search Class
////////////////////////////////////////////////////////////////////////////////
window.SoundCloudSearch = function() {
  //return as class if called as function
  if(!(this instanceof SoundCloudSearch)) {
    return new SoundCloudSearch();
  }
  // All local class variables will begin with underscore '_'
  var self = this;
  var _resDefaults = {
            title : false,
            smlImage: false,
            medImageUrl: false,
            lrgImageUrl: false,
            resourceID : false,
            canStream : false,
            link : false,
            playCount : false,
            waveformUrl : false,
            type: 'soundcloud'
          };
  var _ApiClientId = '139945d817cb38a5500ebb4a4b462dda';
  //initialize API for searching
  SC.initialize({
    client_id: _ApiClientId
  });
  //////////////////////////////////////////////////////////////////////////////
  /// parse Track Method
  //////////////////////////////////////////////////////////////////////////////
  var parseTrack = function(trackObj) {
    var resourceID, smallImage, largeImage;
    var parsedResult = {};
    // sample uri
    //  https://api.soundcloud.com/tracks/137434499
    if(trackObj.uri) {
      var urlStr = trackObj.uri;
      var tempArr = urlStr.split('/');
      resourceID = tempArr.pop();
    }
    // get tiny version of album artwork
    //  large version is loaded by defaults
    if(trackObj.artwork_url) {
      smallImage = trackObj.artwork_url.replace('large', 'badge');
      largeImage = trackObj.artwork_url.replace('large', 't500x500');
    }
    parsedResult = {
      title : (trackObj.title || false),
      smlImage: (smallImage || false),
      medImageUrl: (trackObj.artwork_url || false),
      lrgImageUrl: (largeImage || false),
      resourceID : (resourceID || false),
      canStream : (trackObj.streamable || false),
      link : (trackObj.permalink_url || false),
      playCount : (trackObj.playback_count || false),
      uri: (trackObj.uri || false),
    };

    //fill in undefined with false
    parsedResult = _.defaults(parsedResult, _resDefaults);
    return parsedResult;
  };
  //////////////////////////////////////////////////////////////////////////////
  /// search SoundCloud Tracks Method
  //////////////////////////////////////////////////////////////////////////////
  self.searchForTrack = function(searchString, callbackFunction) {
    var searchResultsArray = [{
      title: ('No results found for' + searchString)
    }];
    // see https://developers.soundcloud.com/docs/api/reference#tracks
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks',
      {
        q: searchString,
        limit: 5
      },
      function(tracks, error) {
        //check for errors
        if (error) {
          console.log('Error: ' + error.message);
        } else {
          //if no errors print out trank results
          if(tracks.length){
            searchResultsArray= [];
          }

          _.each(tracks, function(res) {
            var tempResult = parseTrack(res);
            console.log(tempResult);
            // check if not empty and streamables
            if(tempResult && tempResult.canStream) {
              searchResultsArray.unshift(tempResult);
            }
          });
        }
        callbackFunction(searchResultsArray);
    }); //end of get /tracks call
  };//end of search method
};
