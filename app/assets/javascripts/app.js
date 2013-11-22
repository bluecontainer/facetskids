angular.module('jsonService', ['ngResource'])
.factory('JsonService', function($resource) {
  return $resource('/api/videos?emotion_list=:emotion');
});

var app = angular.module('angularjs-starter', ['jsonService']);

app.controller('MainCtrl', function($scope, JsonService) {

  jsonCallback = function(data) {
    $scope.result.videos = data;
  };

  $scope.$watch('result.emotion', function(newValue, oldValue) {
    console.log('result.emotion changed');
    if (newValue != oldValue) {
      JsonService.query({emotion: newValue}, jsonCallback);
    }
  });

  $scope.result = new Object;
  $scope.result.emotion = "happy";
  JsonService.query({emotion: $scope.result.emotion}, jsonCallback);
});


var addEvent = function addEvent(element, eventName, func) {
	if (element.addEventListener) {
    	return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};

//addEvent(document.getElementById('open-left'), 'click', function(){
//	snapper.open('left');
//});

/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");
