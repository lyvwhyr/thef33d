/* exported CasperPlayer*/
/* global document, console, _, $, */
'use strict';


/**
 * Casper Media Player
 *
 * @constructor
 */
function User(elementId) {
  //defaults settings for sound cloud widget
  this._id          = false; //iframe dom
  this.displayName  = false; //displayName for user
  this.avi          = false; //profilePicUrl
}

 //////////////////////////////////////////////////////////////////////////////
 /// Minimize player from view and show tab
 //////////////////////////////////////////////////////////////////////////////
User.prototype.hide = _.debounce(function() {
  var that = this;
  //if already/still hidden exit function
  if (that.hidden) { return; }
  console.log('self.hide');

  $('#'+ that.domId).transition({
    opacity: 1,
    x: 250,
    y: 0}, 500,'snap');

  $('.hide_button').transition({
    opacity: 1,
    rotate: '180deg'
    },450,'snap');

    that.hidden = true;
}, 1000, true);

////////////////////////// ////////////////////////////////////////////////////
/// Maximize player from view and hide tab
//////////////////////////////////////////////////////////////////////////////
User.prototype.show =  _.debounce(function() {
  var that = this;
  //if already/still visible exit function
  if (! that.hidden) { return; }

  console.log('self.show');
  $('#'+ that.domId).transition({
    opacity: 1,
    x: 0,
    y: 0},450,'easeOutQuint');

  $('.hide_button').transition({
    opacity: 1,
    rotate: '0'
    },450,'snap');

    that.hidden = false;

  $('#'+ that.domId).on('touchstart', function (e) {
      //touchsurface.innerHTML = ''
      var touchobj = e.changedTouches[0];
      var dist = 0;
      var startX = touchobj.pageX;
      var startY = touchobj.pageY;
      var startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
  }, false);

}, 1000, true);
//////////////////////////////////////////////////////////////////////////////
/// clear/destroy player
//////////////////////////////////////////////////////////////////////////////
User.prototype.clear = _.debounce(function() {
  var that = this;
  if(that.hidden) {
    $('#'+ that.domId)
      .transition({
        opacity: 1,
        x: 250,
        y: 0},0,'linear');
  } else {
    $('#'+ that.domId)
      .transition({
        opacity: 0,
        x: -200,
        y: 0}, 250, 'easeOutQuart')
      .transition({
        opacity: 1,
        x: 450,
        y: 0},0,'linear');
  }

  $('.hide_button').transition({
    opacity: 0,
    rotate: '0'
    }, 250, 'snap');
}, 500, true);
