var youTubePlayer = function() {
	'use strict';
	var videoIDs = [];
  var videoIndex = 0;

	var yt_player;
	var $player;

	var playing = false;
  // grab the title of the first product
  var firstProductTitle = $('.mdl-card__supporting-text div strong').first().text();
  // Page keyword
  var keyword = $('#amazon-grid').attr('data-page-keyword');

  var playerVars = {
    'loop': 1,
    'autoplay': 1,
    'controls': 0,
    'modestbranding' : 1,
    'cc_load_policy': 1,
    'iv_load_policy': 3,
    'showinfo': 0,
    'fs': 1
  };
  var that = this;
  that.nextVideo = function() {
    console.log('videoIndex ' + videoIndex);
    console.log('videoIndex.length ' + _.size(videoIDs));
    if(videoIndex < _.size(videoIDs)) {
      videoIndex = videoIndex + 1;
    } else {
      videoIndex = 0;
    }
    yt_player.loadVideoById(videoIDs[videoIndex]);
  };
  that.playRandomVideo = function() {
    var randomVideoId = _.sample(videoIDs);
    console.log('randomVideoId -' + randomVideoId);
    yt_player.loadVideoById(randomVideoId);
  };
  that.previousVideo = function() {
    if(videoIndex > 0) {
      videoIndex = videoIndex - 1;
    } else {
      videoIndex = _.size(videoIDs) - 1;
    }
    yt_player.loadVideoById(videoIDs[videoIndex]);
  };
  that.pauseVideo = function() {
    yt_player.pauseVideo();
  };
  that.playVideo = function() {
    yt_player.playVideo();
  };
	that.setVolume = function(volValue) {
		// int between 1 and 100
		yt_player.setVolume(volValue);
	};
	function create() {
    // if no videos in array
		if (!_.size(videoIDs)) {
			return;
		}

    //build youtube player with videoiDs
		yt_player = new YT.Player('yt_vid', {
			width: '640',
			height: '360',
			videoId: videoIDs[videoIndex],
			playerVars: playerVars,
			events:{
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
				'onError': that.playRandomVideo
			}
		});
	}
	function onPlayerStateChange(event) {
    if(event.data === 0) {
      //video stopped playing
      that.playRandomVideo();
    }
	}
  // get videoIds from server
	function init(q) {
		$.getJSON('/youtube/' + q)
      .done(function(data) {
        //on sucess
        var items = data.items;
  			var newVideoIds = $.map(items, function (vidInfo) {
  				return vidInfo.id.videoId;
  			});
				// merge duplicate free
				videoIDs = _.union(videoIDs, newVideoIds);
				console.log(videoIDs);
        // if player already initialized don't re-init
        if (!yt_player) {
          create();
        }
      });
	}

	function onPlayerReady(event) {
    // shuffle youtube video playback
    //yt_player.playVideo();
    that.playRandomVideo();
    $player = document.querySelector('#yt_vid');
	}
  // search both first product and keyword
	init(firstProductTitle);
  init(keyword);
};
var youtube;
// called when youtube API ready
function onYouTubeIframeAPIReady() {
	console.log('onYouTubeIframeAPIReady called');
	youtube = new youTubePlayer();
}
