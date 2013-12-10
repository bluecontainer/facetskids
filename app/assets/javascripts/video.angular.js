
angular.module('facetsKids.videoplayer', ['facetsKids.videoMarkerService'])

.directive('videoplayer', function ($log) {
  return {
    restrict: 'EA',

    controller: function($scope, VideoMarkerService) {
      $log.debug("videoplayer controller");
      $scope.currentTime = 0;
      $scope.currentVideo = null;
      $scope.currentView = null;
      $scope.videoMarkerService = VideoMarkerService;
    },

    template: '<div style="position: absolute; left: -2000px;"><video controls="false" preload="false" width="634" height="264"/></div>',
    replace: true,

    link: function(scope, elem, attrs) {
      $log.debug("videoplayer link");
      $log.debug(attrs.src);     
      scope.videoElem = elem.children()[0];

      function play(url) {
        $log.debug("play: " + url);
        scope.videoElem.src = url;
        scope.videoElem.load();
      }

      scope.$watch(attrs.src, function(value) {
        $log.debug("videoplayer watch");
        if (value) {
          $log.debug(value);
          scope.currentTime = 0;
          scope.currentVideo = value;
          scope.currentView = null;

          scope.videoMarkerService.get({video_id: scope.currentVideo.id})
            .$promise.then(
              //success
              function( data ){
                $log.debug("existing marker");
                $log.debug(data);

                scope.currentTime = data.current_marker_seconds;
                play(scope.currentVideo.video_url);

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id, current_marker_seconds: data.current_marker_seconds});
                new_marker.$save(function(u){
                  $log.debug(u);
                  scope.currentView = u;
                });
              },
              //error
              function( error ){
                $log.debug("no existing marker");
                $log.debug(error);

                play(scope.currentVideo.video_url);

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id});
                new_marker.$save(function(u){
                  $log.debug(u);
                  scope.currentView = u;
                });
              }
            );
        }
      })

      scope.videoElem.addEventListener('loadeddata', function() {
        $log.debug("loadeddata");
        this.currentTime = scope.currentTime;
        this.webkitEnterFullscreen();
      }, false);

      scope.videoElem.addEventListener("timeupdate", function() {
        scope.currentTime = this.currentTime;
        if (scope.currentView) {
          $log.debug(scope.currentView.current_marker_seconds);
          if (Math.abs(this.currentTime - scope.currentView.current_marker_seconds) >= 10) {
            scope.currentView.current_marker_seconds = Math.floor(this.currentTime);
            $log.debug("update marker");
            scope.currentView.$save(function(u) {
              $log.debug("update marker done");
              $log.debug(u);
            });
          }
        }
      }, false);

      scope.videoElem.addEventListener('webkitbeginfullscreen', function() {
        $log.debug("webkitbeginfullscreen");
        this.play();
      }, false); 

      scope.videoElem.addEventListener('webkitendfullscreen', function() {
        $log.debug("webkitendfullscreen");
      }, false); 
    
      scope.videoElem.addEventListener("ended", function() {
        $log.debug("ended");
        this.webkitExitFullscreen();
      }, false);

    }
  };
});
 

