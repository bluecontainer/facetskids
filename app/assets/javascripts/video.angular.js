
angular.module('facetsKids.videoplayer', [])

.directive('videoplayer', function () {
  return {
    restrict: 'EA',

    controller: function($scope) {
      console.log("videoplayer controller");
      this.currentTime = 0;
    },

    templateUrl: '/assets/video.html',
    replace: true,

    link: function(scope, elem, attrs) {
      console.log("videoplayer link");
      console.log(attrs);     
      scope.videoElem = elem.children()[0];

      function play(url) {
        console.log("play: " + url);
        scope.videoElem.src = url;
        console.log(scope.videoElem);
        scope.videoElem.load();
      }

      scope.$watch(attrs.src, function(value) {
        console.log("videoplayer watch");
        if (value) {
          console.log(value);
          play(value.video_url);
        }
      })

      scope.videoElem.addEventListener('loadeddata', function() {
        console.log("loadeddata");
        this.currentTime = scope.currentTime;
        this.webkitEnterFullscreen();
      }, false);

      scope.videoElem.addEventListener("timeupdate", function() {
        scope.currentTime = this.currentTime;
      }, false);

      scope.videoElem.addEventListener('webkitbeginfullscreen', function() {
        console.log("webkitbeginfullscreen");
        this.play();
      }, false); 
    
      scope.videoElem.addEventListener("ended", function() {
        console.log("ended");
        this.webkitExitFullscreen();
      }, false);

    }
  };
});
 

