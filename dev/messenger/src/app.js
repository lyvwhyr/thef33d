
// using custom template delimiters to react like mustache templating system
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var gSoundCloudPlayer;
var gCasperPlayer;
var gSoundCloudSearch;
var gFireBaseTestChat;
var gUserId = Math.random().toString(36).substr(2);
/* jshint undef: true, unused: false */
/* global console, alert, $, _, moment,
  Firebase, SC, YT,
  SoundCloudPlayer, SoundCloudSearch, CasperPlayer,
 */

 var touchStartX = null;
 var touchStartTime = null;
$(function(){
  // Get a reference to our posts
  gFireBaseTestChat = new Firebase('https://expresso.firebaseIO.com/room/test001');
  gCasperPlayer = new CasperPlayer();
  gSoundCloudSearch = new SoundCloudSearch();
  //random hash right now, thats all

  ////////////////////////////////////////////////////////////////////
  ///// FIREBASE  FUNCTIONS
  ////////////////////////////////////////////////////////////////////
    // Retrieve new posts as they are added to Firebase
    gFireBaseTestChat.on('child_added', function(snapshot) {
      console.log('child added');
      console.log(snapshot.val());
      var htmlString = '';
      var newPost = snapshot.val();
      if(gUserId === newPost.userId) {
        htmlString = '' +
          '<div class="row me">' +
            '<div class="profile"></div>' +
            '<div class="chat_text_card me">' +
              newPost.message +
            '</div>' +
          '</div>';
      } else {
       htmlString = '' +
        '<div class="row">' +
          '<div class="profile"></div>' +
          '<div class="chat_text_card" data-type="text">' +
            newPost.message +
          '</div>' +
        '</div>';
      }
      console.log(htmlString);
      $('.chat_cont').append(htmlString);
    });
  ////////////////////////////////////////////////////////////////////
  ///// MESSAGE BAR FUNCTIONS
  ////////////////////////////////////////////////////////////////////
  var sendMessage = function() {
    //only take first 250 characters
    var messageString = $('.message_bar input').val().slice(0, 250);
    //check if empty
    if(!messageString || messageString === '') {
      return;
    }
    var currentDate = moment().toISOString();
    $('.message_bar input').val('');
    /*$('.chat_cont').append('' +
      '<div class="row me">' +
        '<div class="profile"></div>' +
          '<div class="chat_text_card me">' +
            messageString +
          '</div>' +
      '</div>');*/
    gFireBaseTestChat.push({
      message : messageString,
      dateTime: currentDate,
      type: 'text',
      userId: gUserId
    });
    $('body').scrollTop($('body').outerHeight());
  };
  //search bar events
  $('.message_bar #sendIt').on('click', function() {
    sendMessage();
  });
  $('.message_bar input').on('¡ paste change keydown', function(e) {
    var textLength = $('.message_bar input').val().length || 0;
    var sendButton = $('#sendIt');
    if(textLength || textLength > 0) {
      if(sendButton.hasClass('ion-ios-chatbubble-outline')) {
        sendButton.attr('class','icon ion-ios-chatbubble');
      }
    } else {
      if(sendButton.hasClass('ion-ios-chatbubble')) {
        sendButton.attr('class','icon ion-ios-chatbubble-outline');
      }
    }
    //if enter key is pressed
    if (e.which == 13) {
       sendMessage();
    }
  });

  ////////////////////////////////////////////////////////////////////
  ///// SOUNDCLOUD  FUNCTIONS
  ////////////////////////////////////////////////////////////////////
  // SoundCloud element action
  $('.chat_cont').on('click', '.soundCloudLink', function(){

    var trackId = $(this).attr('data-resouce-id');
    var casparPlayerDom = $('#casper-media');
    var placeholder = $(this).attr('src');
    // hide player
    gCasperPlayer.destroy();
    gCasperPlayer.setPlaceholder(placeholder);
    console.log('trackId ' + trackId);
    gSoundCloudPlayer = new SoundCloudPlayer('casper-media', trackId);
  });
  var searchCallback = function(results) {
    var tracks = results;
    _.each(tracks, function(t) {
      var htmlString = '' +
      '<div class="row">' +
        '<div class="profile"></div>' +
        '<div class="chat_text_card">' +
          t.title;
      if(t.smlImage) {
        htmlString += '<img class="soundCloudLink" src="' + t.lrgImageUrl + '" data-resouce-id="' +
          t.resourceID + '"/>';
      } else {
        htmlString += '<i class="soundCloudLink ion-music-note" data-resouce-id="' +
          t.resourceID + '"></i>';
      }
      htmlString += '' +
        '</div>' +
      '</div>';
      $('.chat_cont').prepend(htmlString);
    });
  };
  gSoundCloudSearch.searchForTrack('Drake Back to Back', searchCallback);
    //fate message added at the end
    var i = 0;
    while (i < 1) {
      var htmlString = '' +
      '<div class="row">' +
        '<div class="profile"></div>' +
        '<div class="chat_text_card" data-type="text">' +
          'Hey, whats up feral. Are you doing anything cool here today?' +
        '</div>' +
      '</div>';
      $('.chat_cont').prepend(htmlString);
      i++;
    }

  ////////////////////////////////////////////////////////////////////
  ///// YOUTUBE  FUNCTIONS
  ////////////////////////////////////////////////////////////////////
  $('.chat_cont').on('click', '.youTubeLink', function() {
    // hide player
    //gCasperPlayer.hide();
    gCasperPlayer.destroy();
    var videoId = $(this).attr('data-resouce-id');
    var imageUrl = $(this).attr('src');
    gCasperPlayer.setPlaceholder('none');
    // show player
    gCasperPlayer.show();
    console.log('videoId ' + videoId);

    var playerVars = {
      enablejsapi: 1,
      modestbranding: 1,
      controls: 2,
      disablekb: 1,
      autohide: 1,
      iv_load_policy: 3,
      showinfo: 0,
      autoplay: 0
    };
    var onPlayerReady = function(event) {
      event.target.playVideo();
      console.log('readddddy');
    };
    var playerDom = $('#casper-media');
    playerDom.attr('src', '//www.youtube.com/embed/' +
      videoId + '?rel=0' +
      '&amp;controls=0' +
      '&amp;showinfo=0' +
      '&amp;autoplay=1' +
      '&amp;iv_load_policy=3' +
      '&amp;modestbranding=1');
    var player = new YT.Player('casparPlayer', {
        height: '104',
        width: '187',
        videoId: 'sSZHjQennxM',
        playerVars: playerVars,
        events: {
          'onReady': onPlayerReady,
        }
    });
  });
  var youtube_url= 'https://www.googleapis.com/youtube/v3/';
  var youtube_key= 'AIzaSyChicIwpV9J2orw3ffLqmtdgZnukIdVd1o';
  //https://code.google.com/apis/console/
  var videos="";
  var youtubeSeach = function(results) {
    _.each(results, function(v) {
      console.log(v);
      var htmlString = '' +
      '<div class="row">' +
        '<div class="profile"></div>' +
        '<div class="chat_text_card">' +
          v.snippet.title;
      if(v.snippet.thumbnails.default.url) {
        htmlString += '<img width="120" class="youTubeLink" ' +
          'src="' + v.snippet.thumbnails.default.url + '" ' +
          'data-resouce-id="' + v.id.videoId + '"/>';
      } else {
        htmlString += '<i class="youTubeLink ion-music-note" data-resouce-id="' +
          v.id.videoId + '"></i>';
      }
      htmlString += '' +
        '</div>' +
      '</div>';
      $('.chat_cont').prepend(htmlString);
      $('body').scrollTop($('body').outerHeight());
    });
  };
  function searchVideos(keyword) {
    var method = 'search';
    $.ajax({
      type: 'GET',
      dataType :'jsonp',
      url : youtube_url + method +
        '?q=' + keyword +
        '&type=video' +
        '&key=' + youtube_key +
        '&part=snippet',
      success : function(json) {
        if(json) {
          videos = json;
          youtubeSeach(videos.items);

        }
      }
    });
  }
  searchVideos('Kelela - A Message ');
  ////////////////////////////////////////////////////////////////////
  ///// MEDIA ADD MODAL
  ////////////////////////////////////////////////////////////////////
  $('.media_search_modal .close_media').click(function(){
    $('.media_search_modal').addClass('hidden');
  });
  $('.open_media').click(function(){
    $('.media_search_modal').removeClass('hidden');
  });
});
