
function PeerJs() {
  if (!(this instanceof PeerJs)) {
    return new PeerJs();
  }
  // Compatibility shim
  navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;



  var guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  };

  var _guid = guid();

  var _local = {
    id: _guid,
    stream: null
  };

  var self = this;
  var _peer = null;
  self.connectedPeers = {};
  /////////////////////////////////////////////////////////////////////////////
  // Initialization funtion
  /////////////////////////////////////////////////////////////////////////////
  var init = function() {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
          'video': {
            'mandatory': {
             'minWidth': 500,
             'maxWidth': 500,
             'minHeight': 500,
             'maxHeight': 500
            },
            'optional': []
          },
          audio: true
        },
       getUserMediaOkCallback,
       getUserMediaFailedCallback);
    } else {
      console.error('Failed to retreive "navigator.getUserMedia"');
    }
  };

  var makeVideoContainer = function(peerId) {
    return '<div class="video-container" data-peer-id="' +
        peerId + '">' +
      '<video class="peerVideo">' +
      '</video>' +
    '</div>';
  };
  function attachCallEvents(call) {
    call.on('stream', function(remoteStream) {
      // Create video element to stream new peer
      var $peerDom = $(makeVideoContainer(call.peer));

      self.removeVideoPeer(call.peer);
      $('body').append($peerDom);
      // add stream to collection
      self.connectedPeers[call.peer] = remoteStream;
      //navigator.attachMediaStream( $peerDom, remoteStream);
      $peerDom.find('video').prop('src', URL.createObjectURL(remoteStream));
    });
    // on close remove from dom
    call.on('close', function() {
      self.removeVideoPeer(call.peer);
    });
    // on error remove from dom
    call.on('error', function(err) {
      self.removeVideoPeer(err);
    });
  };


  //////////////////////////////////////////////////////////////////////////////
  //  Funtion to create client connection to PeerJs server
  //    and attach connection GlobalEventHandlers
  //////////////////////////////////////////////////////////////////////////////
  function connect() {
    _peer = null;
    _peer = new Peer(
      _local.id, {
        debug: 3,
        host: '/',
        port: 9000
      });

     // Receiving a call
    _peer.on('call', function(call) {
      call.answer(_local.stream);
      attachCallEvents(call);
      // Answer the call automatically
      // (instead of prompting user) for demo purposes

    });
    // ON EEROR FROM PEER JS SERVER
    _peer.on('error', function(err) {
      console.error(err.message);
    });
    // REMOTE CONNECTION CLOSED
    _peer.on('connection', function(conn) {
      console.log('on connection');
      conn.on('open', function() {
        var call = _peer.call(conn.peer, window.localStream);
        attachCallEvents(call);
      });
    });

    _peer.on('disconnected', function() {
      _.delay(connect(), 5000);
    });
  };

  self.addVideoPeer = function(peerID) {
    if (!_local.stream) return;
    console.log('addVideoPeer called');
    // Make call to peer
    var call = _peer.call(peerID, _local.stream);
    attachCallEvents(call);
  };

  self.removeVideoPeer = function(peerID) {
    // remove peer video from dom
    $('.video-container[data-peer-id="' + peerID + '"]').remove();
    // remove peer video from local data
    _.omit(self.connectedPeers, peerID);
  };


  function connectedClientsPoll() {

    // retrieve list of connected peers
    $.ajax('connected')
      .done(function(data) {
        //console.log('connectedPeers %O', data);
        _.each(data, function(newPeerID) {
          // if peerId is new add new connection
         if (!_.has(self.connectedPeers, newPeerID) &&
            (newPeerID != _local.id)) {
            self.connectedPeers[newPeerID] = '';
            self.addVideoPeer(newPeerID);
          }
        });
        _.each(self.connectedPeers, function(oldPeerID) {
          // if old peerId was deleted remove connection
         if (!(_.has(data, oldPeerID)) &&
            (oldPeerID != _local.id)) {
            self.removeVideoPeer(oldPeerID);
          }
        });
      })
      .always(function() {
        // check again in .5 seconds
       _.delay(connectedClientsPoll, 3000);
      });
  }

  function getUserMediaFailedCallback(error) {
    $('#my_stream').css({'display': 'none'});
    console.error('Error while requesting access camera, %O', error);
    connect();
    connectedClientsPoll();
  }

  function getUserMediaOkCallback(localStream) {
    connect();
    _local.stream = localStream;
    var $myStream = $('#my_stream');
    // Call the polyfill wrapper to attach the media stream to this element.
    //navigator.attachMediaStream( $myStream, stream);
    $('#my_stream').prop('src', URL.createObjectURL(localStream));
    // poll for remote clients and connect
    connectedClientsPoll();
  }


  init();
}
