/* exported CasperPlayer*/
/* global document, console, _, $, */

//  macbook pro US in chrome
//  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4)
//    AppleWebKit/537.36 (KHTML, like Gecko)
//    Chrome/46.0.2474.0 Safari/537.36

/*
#casper-cont{
  position: fixed;
  top: 10px;right: 10px;
  width: 240px;height: 135px;
  padding: 0;margin: 0;
  overflow: visible;
  border: none;
  z-index: 3;
}
#casper-cont .hide_button{
  height: 40px; width: 40px;
  background-color: #E91E63;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  position: absolute;
  bottom: -45px; right: 0;
  border-radius: 2px;
}
#casper-cont #casper-overlay{
  position: absolute;
  top:0;left:0;
  width: 240px;height: 135px;
  padding: :0;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  margin: 0; padding: 0;
  z-index: 1;
}
#casper-cont #casper-media{
  width: 240px;height: 135px;
  padding: :0;
  background-color: none;
  background-image: none;
  background-repeat: no-repeat;
  background: none no-repeat top right fixed;
  background-size: 240px auto;
  border: none;
  margin: 0 0 0 auto;
}

Youtube.com screen dimentions
360/640
screen ration = 0.5625


*/

/**
 * Casper Media Player - Player for embeded content on Expresso
 * @constructor
 */
function CasperPlayer() {
  'use strict';
  // this element is the parent container for all the content
  this.player = $('<div>', { id: 'casper-cont'});
  // this iframe element stores the embeded media
  this.media = $('<iframe>', { id: 'casper-media'});
  // this element intercepts touchces from user
  this.touchSurface = $('<div>', { id: 'casper-overlay'});

  // post de

  this.screenWidth = window.innerWidth || document.body.clientWidth;
  this.screenHeight = window.innerHeight || document.body.clientHeight;

  this.maximized = false;

  this.playerWidth = (this.screenWidth / 2);
  this.playerHeight = this.playerWidth * 0.5625;
  this.maxPlayerHeight = this.screenWidth * 0.5625;

  // append dom to page
  this.player.append(this.touchSurface);
  this.player.append(this.media);
  $('body').prepend(this.player);

  this.src          = null; //source URL for iframe
  this.placeholder  = null; //preview pic before load
  this.currentMedia = null;
  this.mediaType    = null;

  this.active       = null;
  this.loading      = null;



  var that = this;

  //////////////////////////////////////////////////////////////////////////////
  /// ontouchStartEvent
  //////////////////////////////////////////////////////////////////////////////
  that.onTouchStart = function(e) {
    // x axis swipe distance before activating close
    that.swipeDistanceLimit  = (window.innerWidth / 2) ||
        (document.body.clientWidth / 2);
    //limit of acceleration of swipe before closing player
    //this.swipeAccelLimit = 2.0;

    var $overlay = $('#casper-cont #caper-overlay')[0];
    console.log(e);
    //touchsurface.innerHTML = ''
    var touchobj = e.originalEvent.changedTouches[0];
    that.touchStartX = parseInt(touchobj.clientX);
    that.touchStartTime = new Date().getTime(); // record time when finger first makes contact with surface
    console.log('touchStartX ' + that.touchStartX);
    console.log('touchStartTime ' + that.touchStartTime);
    e.originalEvent.preventDefault();
  };
  //////////////////////////////////////////////////////////////////////////////
  /// onTouchMove Event
  //////////////////////////////////////////////////////////////////////////////
  that.onTouchMove = function(e) {
    var touchobj = e.originalEvent.changedTouches[0]; // reference first touch point for this event
    var dist = parseInt(touchobj.clientX - that.touchStartX);
    var time = new Date().getTime();
    if(time - that.touchStartX > 10 && dist < 10) {
      //var currentPos = parseInt($('#caspar_cont').css('right'));
      //console.log('currentPos ' + (currentPos));
      var totalDistance = 10 + dist * -1;
      var opacity =  ((that.swipeDistanceLimit - totalDistance) / that.swipeDistanceLimit);
      //console.log('opacity ' + opacity);
      //console.log('moving ' + totalDistance);
      that.player.css({'right':  totalDistance + 'px', 'opacity': opacity});
    }
    e.originalEvent.preventDefault();
  };
  //////////////////////////////////////////////////////////////////////////////
  /// onTouchEnd Event
  //////////////////////////////////////////////////////////////////////////////
  that.onTouchEnd = function(e) {
    var touchobj = e.originalEvent.changedTouches[0];
    var dist = 0;
    var endX = parseInt(touchobj.clientX);
    var endTime = new Date().getTime(); // record time when finger first makes contact with surface
    var duration = endTime - that.touchStartTime;
    var distance = that.touchStartX - endX;
    console.log('(that.touchStartX - endX)  ' + (that.touchStartX - endX) );
    //console.log('endTime ' + endTime);
    if (duration < 150 && distance < 10) {
      //register as click
      console.log('CLICKED');
      if (that.maximized) {
        that.maximized = false;
        that.show();
      } else {
        that.maximized = true;
        that.maximize();
      }

    }
    else if (duration < 300 && distance > 50 ||
        duration >= 300 && distance > that.swipeDistanceLimit) {
      console.log(endX - that.touchStartX);
      console.log('!CLOSE!');
      that.player.transition({'right': '300px', 'opacity': '0.0'}, 200, 'ease')
        .transition({'top': '10px', 'right': '10px',  'opacity': '0.0'}, 0, 'snap');
      that.destroy();
    }
    else {
      that.player.transition({'right': '10px',  'opacity': '1.0'}, 150, 'snap');
    }
    that.touchStartX = null;
    that.touchStartTime = null;
    e.originalEvent.preventDefault();
  };

  ////////////////////////// ////////////////////////////////////////////////////
  /// Maximize player from view and hide tab
  //////////////////////////////////////////////////////////////////////////////
  that.show =  function() {
    var that = this;
    that.active = true;
    this.player.css({
      'position': 'fixed',
      'padding': '0',
      'margin': '0',
      'width': this.playerWidth,
      'height': this.playerHeight,
      'overflow': 'hidden',
      'border': 'none',
      'z-index': '3',
      'top': '10px',
      'right': '10px',
      'opacity': '1'
    });

    this.touchSurface.css({
      'position': 'absolute',
      'padding': '0',
      'margin': '0',
      'width': this.playerWidth,
      'height': this.playerHeight,
      'overflow': 'hidden',
      'border': 'none',
      'z-index': '1',
      'opacity': '1'
    });

    this.media.css({
      'position': 'relative',
      'padding': '0',
      'margin': '0',
      'width': this.playerWidth,
      'height': this.playerHeight,
      'overflow': 'hidden',
      'border': 'none',
      'opacity': '1'
    });
  };
  //////////////////////////////////////////////////////////////////////////////
  /// Minimize player from view and show tab
  //////////////////////////////////////////////////////////////////////////////
  that.hide = function() {
    var that = this;
    that.active = false;
    that.player
      .transition({'top': '100px', 'scale': '10px',  'opacity': '0.0'}, 200, 'ease')
      .transition({'top': '10px', 'right': '10px',  'opacity': '0.0'}, 0, 'snap');
  };

  // attach events
  that.player.on('hide', that.hide);
  that.player.on('startLoad', that.loading);
  that.player.on('endLoad', that.endLoad);
  that.player.on('maximize', that.maximize);
  that.player.on('minimize', that.minimize);
  that.player.on('touchstart', that.touchSurface,  that.onTouchStart);
  that.player.on('touchmove', that.touchSurface, that.onTouchMove);
  that.player.on('touchend', that.touchSurface, that.onTouchEnd);
}

////////////////////////// ////////////////////////////////////////////////////
/// Maximize player from view and hide tab
//////////////////////////////////////////////////////////////////////////////
CasperPlayer.prototype.loadById =  function() {
  var that = this;
};

//////////////////////////////////////////////////////////////////////////////
/// Sets Player In Loading State
//////////////////////////////////////////////////////////////////////////////
CasperPlayer.prototype.startLoad = function() {
  var that = this;
  that.loading = true;
};
//////////////////////////////////////////////////////////////////////////////
/// Sets Player In Loading State
//////////////////////////////////////////////////////////////////////////////
CasperPlayer.prototype.endLoad = function() {
  that.loading = true;
};
////////////////////////////////////////////////////////////////
/// Expands Player to Full Screen
//////////////////////////////////////////////////////////////////////////////
CasperPlayer.prototype.maximize = function() {
  var that = this;
  //reset player position
  that.player.transition({
    'right': '0px',
    'top': '0px',
    'opacity': '1.0',
    'width': that.screenWidth,
    'height': that.screenHeight,
    'background-color': '#fff'
  }, 100, 'ease');


  that.touchSurface.css({
    'position': 'absolute',
    'padding': '0',
    'margin': '0',
    'width': this.screenWidth,
    'height': this.maxPlayerHeight,
    'overflow': 'hidden',
    'border': 'none',
    'z-index': '1'
  });

  that.media.css({
    'position': 'relative',
    'padding': '0',
    'margin': '0',
    'width': this.screenWidth,
    'height': this.maxPlayerHeight,
    'overflow': 'hidden',
    'border': 'none'
  });

};

CasperPlayer.prototype.setPlaceholder = function(placeholderUrl) {
  var that = this;
  that.touchSurface.css({
    'background': 'url(' + placeholderUrl +') no-repeat',
    'background-size': 'cover'
  });
};

//////////////////////////////////////////////////////////////////////////////
/// clear/destroy player
//////////////////////////////////////////////////////////////////////////////
CasperPlayer.prototype.destroy = function() {
  // let's reset everything
  var that = this;
  that.src          = null;
  that.placeholder  = null;
  that.currentMedia = null;
  that.mediaType    = null;
  that.active       = null;
  that.loading      = null;

  that.media.attr('src', 'null');

  //reset player position
  that.player
    .transition({'top': '10px','right': '10px',  'opacity': '0.0'}, 0, 'snap');

  that.screenWidth = window.innerWidth || document.body.clientWidth;
  that.screenHeight = window.innerHeight || document.body.clientHeight;
};
