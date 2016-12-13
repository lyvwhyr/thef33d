/* global console, setInterval, _, $, document, transition, angular, moment, Firebase  */
'use strict';

$(document).ready(function() {

  $('.windoz .button').click(function() {
    $(this).parent().remove();
  });

  $('.onxies')
  .transition({ scale: 0.95, opacity: 0, x: -100, y: -100},0,'linear')
  .transition({ opacity: 0.5,delay: 1000},100,'snap')
  .transition({ opacity: 0.0},100,'snap')
  .transition({ opacity: 0.2},100,'snap')
  .transition({ opacity: 0.5},100,'snap')
  .transition({ opacity: 0.0},100,'snap')
  .transition({ opacity: 0.8, delay: 500},50,'snap')
  .transition({ opacity: 0.0},300,'snap')
  .transition({ opacity: 1, delay: 100},1000,'snap')
  .transition({ scale: 1, delay: 500},400,'snap')
  .transition({ y: 0},200,'ease')
  .transition({ x: 80},1000,'ease');

  $('#da_box1')
    .transition({ x: 100,opacity: 0}, 0, 'linear')
    .transition({ x: -40, opacity: 1, delay: 4500},2000,'snap');


  $('#da_box2')
    .transition({ x: 100, y: 150, opacity: 0},0,'linear')
    .transition({ x: -50, opacity: 1, delay: 4700},2000,'snap');

  $('#da_box3')
    .transition({ x: 100, y: 300, opacity: 0},0,'linear')
    .transition({ x: -120, opacity: 1, delay: 4900},2000,'snap');

});


function onyxLog(logLine) {
  $('#onyxLog .line-container')
      .append('<div class="line"><b>log@onyx#</b> ' + String(logLine) + '</div>');
}
var app = angular.module('onyx', ['firebase']);

app.controller('clockController', clockController);
app.controller('bioController', bioController);
app.controller('weatherController', weatherController);



function clockController($scope, $timeout) {
  var vm = this;
  $scope.time = '';

  function updateTime() {
    $scope.time = moment().format('LTS');
    $timeout(updateTime, 1000);
  }

  updateTime();
}

//
//  My Standard Format for my firebase bioData
//    object.dataValue
//    object.dataLabel
//    object.timestamp
//
function bioController($scope, $firebaseArray, $interval, $timeout) {
  var vm = this;
  var url = 'https://expresso.firebaseio.com/biometrics/bpm';
	var bpmRef = new Firebase(url);
  var query = bpmRef.orderByChild("timestamp").limitToLast(1);
  var lastBpmObject = $firebaseArray(query);

  $scope.currentBpm = 0;
  $scope.lastTimestamp = null;
  $scope.sensorActive = false;

  // Bind the biometrics/bpm to the firebase provider.
  $scope.bpm = $firebaseArray(bpmRef);

  function animateHeart() {
    if(!$scope.currentBpm) {
      $timeout(animateHeart, 100);
      return;
    }
    var beatsPerSecond = 60 / $scope.currentBpm;
    //console.log('beatsPerSecond ' + beatsPerSecond);
    var halfBps = String(beatsPerSecond / 3 * 1000).substring(0,3);

    $('#hr-icon')
      .transition({ scale: 0.85 }, halfBps, 'snap')
      .transition({ scale: 1.0 }, halfBps, 'ease');

    var delayTime = beatsPerSecond * 1000;

    $timeout(animateHeart, delayTime);
  }

  function onBpmChange(event) {
    //console.log(event);
    var oneMinuteAgo = moment().subtract(1, 'm');
    var currentBpm = 0;
    var lastTimestamp = '';
    var sensorActive = 'No';
    // rerteive just last value
    //console.log(lastBpmObject);

    // if value recevied them update model
    if (lastBpmObject[0] ) {
      // digest ISO861 timestamp
      lastTimestamp = moment(lastBpmObject[0].timestamp);
      currentBpm = lastBpmObject[0].dataValue;
    }

    // if timestamp for last value more than 1 mimnute ago
    if (lastTimestamp && lastTimestamp > oneMinuteAgo) {
      sensorActive = 'Yes';
    }
    else {
      sensorActive = 'No';
    }

    if (lastTimestamp && currentBpm) {
      $scope.currentBpm = currentBpm || '';
      $scope.lastTimestamp = lastTimestamp.fromNow()  || '';
      $scope.sensorActive = sensorActive;
    }
    onyxLog('bpm:' + currentBpm);
    onyxLog('sensorActive:' + sensorActive);
  }

  $scope.$watch('bpm', onBpmChange, true);

  animateHeart();
}



function weatherController($http) {
  var openWaeatherApiKey = '91e4c96cb7dfb93b3fbba620e0bd33c2';
  var baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  var vm = this;
  vm.lat = null;
  vm.lng = null;

  vm.main = '';
  vm.description = '';
  vm.temp = '';
  vm.humidity = '';
  vm.minTemp = '';
  vm.maxTemp = '';

  function reqUrl() {
    return baseUrl + '?lat=' + vm.lat +
            '&lon=' + vm.lng +
            '&units=imperial' +
            '&appid=' + openWaeatherApiKey;
  }
  function onGpsLocation(position) {
    vm.lat = position.coords.latitude;
    vm.lng = position.coords.longitude;
    getWeather();
  }
  //Function to retrieve gps location from bmrowser
  function getGpsLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGpsLocation);
    }
  }
  // function for successful openWeather api request
  function onSuccess(res) {
    console.log(res.data);
    vm.minTemp = res.data.main.temp_min;
    vm.maxTemp = res.data.main.temp_max;
    vm.humidity = res.data.main.humidity;
    onyxLog('minTemp:' + vm.minTemp + 'F');
    onyxLog('maxTemp:' + vm.maxTemp + 'F');
    onyxLog('humidity:' + vm.humidity + '%');
  }
  function onFail() {

  }
  function getWeather() {
    var url = reqUrl();
    $http
        .get(url)
        .then(onSuccess)
        .catch(onFail);
  }

  getGpsLocation();

}


/*
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ProjectListController as projectList',
      templateUrl:'list.html',
      resolve: {
        projects: function (Projects) {
          return Projects.fetch();
        }
      }
    })
    .when('/edit/:projectId', {
      controller:'EditProjectController as editProject',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'NewProjectController as editProject',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
*/



/*
$.getJSON('http://n-feralcode.rhcloud.com/fitbit/steps', {cache:false}, function(data) {
  $('.onxies').append(data.steps + ' steps taken today');
});



.controller('TodoListController', function() {
  var todoList = this;
  todoList.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

  todoList.addTodo = function() {
    todoList.todos.push({text:todoList.todoText, done:false});
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.archive = function() {
    var oldTodos = todoList.todos;
    todoList.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) todoList.todos.push(todo);
    });
  };
});
*/
