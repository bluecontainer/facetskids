
angular.module('facetsKids.videoplayer', ['facetsKids.videoMarkerService'])

.directive('videoplayer', function ($log) {
  return {
    restrict: 'EA',

    controller: function($scope, VideoMarkerService) {
      $log.debug("videoplayer controller");
      $scope.startTime = 0;
      $scope.currentVideo = null;
      $scope.currentView = null;
      $scope.paused = false;
      $scope.seeked = false;
      $scope.timeupdate = false;
      $scope.playing = false;
      $scope.videoMarkerService = VideoMarkerService;
    },

    template: '<div style="position: absolute; left: -2000px;"><video controls="false" preload="false" width="634" height="264"/></div>',
    replace: true,

    link: function(scope, elem, attrs) {
      $log.debug("videoplayer link");
      $log.debug(attrs.src);
      scope.videoElem = elem.children()[0];

      function play(video) {
        $log.debug("play: " + video.video_url);
        if (video.video_url == scope.videoElem.src && scope.paused) {
          $log.debug("resuming");
          scope.paused = false;
          scope.videoElem.webkitEnterFullscreen();
        } else {
          $log.debug("loading");
          scope.startTime = 0;
          scope.currentVideo = video;
          scope.currentView = null;
          scope.paused = false;
          scope.seeked = false;
          scope.timeupdate = false;
          scope.playing = false;
          scope.videoElem.src = video.video_url;
          scope.videoElem.load();

          scope.videoMarkerService.get({video_id: scope.currentVideo.id})
            .$promise.then(
              //success
              function( data ){
                $log.debug("existing marker");
                $log.debug(data);

                scope.startTime = data.current_marker_seconds;

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

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id});
                new_marker.$save(function(u){
                  $log.debug(u);
                  scope.currentView = u;
                });
              }
            );
        }
      }
      scope.play = play;

      scope.videoElem.addEventListener('canplaythrough', function() {
        $log.info('canplaythrough: ' + scope.startTime.toString());
        if (!scope.paused) {
          this.webkitEnterFullscreen();
        }
      }, false);

      scope.videoElem.addEventListener('loadeddata', function() {
        $log.info("loadeddata: " + scope.startTime.toString());
      }, false);

      scope.videoElem.addEventListener("seeked", function() {
        $log.info("seeked");
      }, false);
      scope.videoElem.addEventListener("timeupdate", function() {
        if (scope.currentView) {
          if (scope.startTime > 0 && !scope.seeked && scope.playing) {
            $log.info("timeupdate: seeking to startTime: " + scope.startTime.toString());
            this.currentTime = scope.startTime;
            scope.seeked = true;
          }
          $log.debug(scope.currentView.current_marker_seconds);
          if (Math.abs(this.currentTime - scope.currentView.current_marker_seconds) >= 10) {
            scope.currentView.current_marker_seconds = Math.floor(this.currentTime);
            $log.debug("update marker: " + scope.currentView.current_marker_seconds.toString());
            scope.currentView.$save(function(u) {
              $log.debug("update marker done");
              $log.debug(u);
            });
          }
        }
      }, false);

      scope.videoElem.addEventListener('webkitbeginfullscreen', function() {
        $log.info("webkitbeginfullscreen: " + scope.startTime.toString());
        this.play();
      }, false); 

      scope.videoElem.addEventListener('webkitendfullscreen', function() {
        $log.info("webkitendfullscreen");
        this.pause();
      }, false); 

      scope.videoElem.addEventListener('playing', function() {
        $log.info("playing: " + scope.startTime.toString());
        scope.playing = true;
        if (scope.startTime > 0 && scope.timeupdate && !scope.seeked) {
          $log.info("playing: seeking to startTime: " + scope.startTime.toString());
          this.currentTime = scope.startTime;
          scope.seeked = true;
        }
      }, false);

      scope.videoElem.addEventListener('play', function() {
        $log.info("play");
        scope.paused = false;
      }, false);

      scope.videoElem.addEventListener('pause', function() {
        $log.info("pause");
        scope.paused = true;
      }, false);

      scope.videoElem.addEventListener("ended", function() {
        $log.info("ended");
        this.webkitExitFullscreen();
      }, false);
    }
  };
});
 

