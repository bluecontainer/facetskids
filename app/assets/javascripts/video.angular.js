
angular.module('facetsKids.videoplayer', ['facetsKids.videoMarkerService'])

.directive('videoplayer', function () {
  return {
    restrict: 'EA',

    controller: function($scope, VideoMarkerService) {
      console.log("videoplayer controller");
      $scope.currentTime = 0;
      $scope.currentVideo = null;
      $scope.currentView = null;
      console.log("service");
      console.log(VideoMarkerService);
      $scope.videoMarkerService = VideoMarkerService;
    },

    template: '<div style="position: absolute; left: -2000px;"><video controls="false" preload="false" width="634" height="264"/></div>',
    replace: true,

    link: function(scope, elem, attrs) {
      console.log("videoplayer link");
      console.log(attrs.src);     
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
          scope.currentTime = 0;
          scope.currentVideo = value;
          scope.currentView = null;

          console.log(scope);
          console.log(scope.videoMarkerService);
          console.log(scope.currentVideo);
          scope.videoMarkerService.get({video_id: scope.currentVideo.id})
            .$promise.then(
              //success
              function( data ){
                console.log("existing marker");
                console.log(data);

                scope.currentTime = data.current_marker_seconds;
                play(scope.currentVideo.video_url);

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id, current_marker_seconds: data.current_marker_seconds});
                new_marker.$save(function(u){
                  console.log(u);
                  scope.currentView = u;
                });
              },
              //error
              function( error ){
                console.log("no existing marker");
                console.log(error);

                play(scope.currentVideo.video_url);

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id});
                new_marker.$save(function(u){
                  console.log(u);
                  scope.currentView = u;
                });
              }
            );
        }
      })

      scope.videoElem.addEventListener('loadeddata', function() {
        console.log("loadeddata");
        this.currentTime = scope.currentTime;
        this.webkitEnterFullscreen();
      }, false);

      scope.videoElem.addEventListener("timeupdate", function() {
        scope.currentTime = this.currentTime;
        if (scope.currentView) {
          console.log(scope.currentView.current_marker_seconds);
          if (Math.abs(this.currentTime - scope.currentView.current_marker_seconds) >= 10) {
            scope.currentView.current_marker_seconds = Math.floor(this.currentTime);
            console.log("update marker");
            scope.currentView.$save(function(u) {
              console.log("update marker done");
              console.log(u);
            });
          }
        }
      }, false);

      scope.videoElem.addEventListener('webkitbeginfullscreen', function() {
        console.log("webkitbeginfullscreen");
        this.play();
      }, false); 

      scope.videoElem.addEventListener('webkitendfullscreen', function() {
        console.log("webkitendfullscreen");
      }, false); 
    
      scope.videoElem.addEventListener("ended", function() {
        console.log("ended");
        this.webkitExitFullscreen();
      }, false);

    }
  };
});
 

