
var app = angular.module('facetsKidsApp', ['facetsKids.tagListService','facetsKids.videoTaggingService','facetsKids.videoplayer','facetsKids.rating','facetsKids.svginline', 'facetsKids.marquee', 'ngSanitize']);

app.config(function($logProvider){
  $logProvider.debugEnabled(true);
});

app.controller('MainCtrl', function($scope, $log, TagListService, VideoTaggingService) {
  $log.debug("MainCtrl controller");

  $scope.result = new Object;
  $scope.result.selected_video = null;
  $scope.result.play_video = null;
  $scope.result.videos = {};

  $scope.result.selected_user_video = null;

  $scope.selected = new Object;
  $scope.selected.user_rating = 0;
  $scope.selected.user_emotion_list = [];
  $scope.selected.emotion = [];

  $scope.result.curated_tag_list = [{name: "top_rated", label: "Top Rated"}, {name: "brand_new", label: "Brand New"}, {name: "picks_for_me", label: "Picks For Me"}, {name: "animation_antics", label: "Animation Antics"}];
  $scope.result.curated_tag_list.map ( function(item) {
    requestVideoList(item.name);
  });

  $scope.result.selectVideo = selectVideo;
  
  $scope.result.playVideo = function(video) {
    $log.debug("playVideo");
    $log.debug(video);

    selectVideo(video);

    $scope.result.play_video = video;
    $scope.play(video);    
  }

  $scope.result.getVideoList = getVideoList;

  function selectVideo(video) {
    $log.debug('selectVideo');

    if ($scope.user_rating_watcher) {
      $scope.user_rating_watcher();
    }
    if ($scope.user_emotion_list_watcher) {
      $scope.user_emotion_list_watcher();
    }

    $scope.result.selected_video = video;
    var user_video = VideoTaggingService.get({id: video.id}, function() {
      $log.debug("VideoTaggingService.query callback");
      $log.debug(user_video);

      $scope.result.selected_user_video = user_video;
      if (!user_video.user_rating) {
        $scope.selected.user_rating = 0;
      } else {
        $log.debug(user_video.user_rating);
        $scope.selected.user_rating = parseInt(user_video.user_rating.charAt(0));
      }
      if (!user_video.user_emotion_list) {
        $scope.selected.user_emotion_list = [];
      } else {
        $scope.selected.user_emotion_list = user_video.user_emotion_list;
      }

      $scope.user_rating_watcher = $scope.$watch('selected.user_rating', function(newValue, oldValue) {
        if (newValue != oldValue) {
          $log.debug('user_rating changed - ' + newValue);
          $scope.result.selected_user_video.user_rating = newValue.toString() + "_star";
          $scope.result.selected_user_video.$save();
        }
      });

      $scope.user_emotion_list_watcher = $scope.$watch('selected.user_emotion_list', function(newValue, oldValue) {
        if (newValue != oldValue) {
          $log.debug('user_emotion_list changed = ' + newValue);
          $scope.result.selected_user_video.user_emotion_list = newValue;
          $scope.result.selected_user_video.$save();
        }
      });

    });
  }
 
  function getVideoList(name) {
    if (name == "")
      return;
    $log.debug("getVideoList: " + name);
    $log.debug($scope.result.videos);
    if (!(name in $scope.result.videos)) {
      $scope.result.videos[name] = [];
      requestVideoList(name);
    }
    return $scope.result.videos[name];
  }

  function requestVideoList(tag) {
    if (tag != 'home') {
      var videos = TagListService.query({tag: tag}, function() {
        $log.debug("TagListService.query callback");
        $log.debug(videos);
        $scope.result.videos[tag] = videos;
      });
    }
  }

  $scope.$watch('selected.emotion', function(newValue, oldValue) {
    if (newValue != oldValue) {
      $log.debug('selected.emotion changed = ' + newValue);
      getVideoList(newValue);
    }
  });
});

app.directive('repeatLastNotifier', ['$log', function($log) {
  return function(scope, element, attrs) {
    $log.debug("repeatLastNotifier");
    if (scope.$last){
      scope.$emit('repeatLastNotifier');
    }
  };
}]);

app.directive('iosslider', ['$parse', '$log', function($parse, $log) {  

  var defaultOptions = {
        desktopClickDrag: true,
  	snapToChildren: true,
    	keyboardControls: true,
        elasticPullResistance: 0.9
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        $scope.sliderElem.iosSlider('addSlide', slideElem);
        $scope.sliderElem.iosSlider('goToSlide', 1);
      }

      this.updateSlide = function() {
        $scope.sliderElem.iosSlider('update');
      }
    },

    link: function(scope, elem, attrs) {
      $log.debug("iosslider link");

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSlider(options);
    }
  }
}])

app.directive('slide', ['$log', function($log) {

  return {
    require: '^iosslider',
    link: function(scope, element, attrs, sliderCtrl) {
      $log.debug("slide link");
      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        sliderCtrl.updateSlide();
      });
    }
  }
}])


app.directive('iosvslider', ['$parse', '$log', function($parse, $log) {  
  $log.debug("iosvslider directive");

  var defaultOptions = {
        elasticPullResistance: 0.9,
        slideStartVelocityThreshold: 5
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      $log.debug("iosvslider controller");
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        $log.debug("addVSlide");
        if ($scope.sliderElem) {
          $log.debug($scope.sliderElem.data('args'));
 
          $scope.sliderElem.iosSliderVertical('addSlide', slideElem);
          $scope.sliderElem.iosSliderVertical('goToSlide', 1);
          $scope.sliderElem.iosSliderVertical('update');
        }
      }

      this.updateSlide = function() {
        $log.debug("updateVSlide");
        if ($scope.sliderElem) {
          $scope.sliderElem.iosSliderVertical('update');
        }
      }
    },

    link: function(scope, elem, attrs, ctrl) {
      $log.debug("iosvslider link");
      $log.debug(elem);

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSliderVertical(options);

      scope.$on('$destroy', function() {
        $log.debug("iosvslider scope destroy");
      });

      scope.$parent.$on('repeatLastNotifier', function(event){
        $log.debug("repeatLastNotifier received in iosvslider");
        ctrl.updateSlide();
      });
 
    }
  }
}])

app.directive('vslide', ['$log', function($log) {
  $log.debug ("vslide directive");

  return {
    require: '^iosvslider',
    link: function(scope, element, attrs, sliderCtrl) {
      $log.debug("vslide link");
      $log.debug(element);

      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        $log.debug("vslide scope destroy");

        sliderCtrl.updateSlide();
      });
    }
  }
}])

app.directive('svgbuttongroup', ['$log', function($log) {
  $log.debug("svgbuttongroup directive");

  return {
    restrict: 'EA',
    scope: { 
      tagList: '='
    },

    controller: function($scope, $attrs, $parse) {
      $log.debug("svgbuttongroup controller");

      $scope.btns = [];
      $scope.multiple = true;
      if ($attrs.multiple) {
        $scope.$parent.$watch($parse($attrs.multiple), function(value) {
          $scope.multiple = !!value;
        });
      }

      this.addBtn = function(btn) {
        $log.debug("addBtn");
        $scope.btns.push(btn);
      }

      function resetState(btns) {
        $log.debug("svgbuttongroup clear");

        btns.forEach(function(btn) {
          $log.debug("svgbuttongroup " + btn.tag + " set false");
          btn.state = false;
        });
        $log.debug(btns);
      }

      this.update = function () {
        $log.debug("svgbuttongroup update");
        $scope.tagList = [];
        $scope.btns.forEach(function(btn) {
          if (btn.state) {
            $log.debug("svgbuttongroup " + btn.tag + " set true");
            $scope.tagList.push(btn.tag);
          }
        });
      }
     
      this.select = function (btn) {
        $log.debug("svgbuttongroup select");
        
        if ($scope.multiple) {
          btn.state = !btn.state;
          this.update();
        } else {
          resetState($scope.btns);     
          btn.state = true;
          this.update();
        }
      };
 
 
      ctrl = this;

      $scope.$watch('tagList', function(value) {
        $log.debug("tagList watch:");
        $log.debug(value);
        $log.debug($scope.btns);
        if (value) {
          resetState($scope.btns);
          $log.debug("tagList watch: ");
          $log.debug($scope.btns);
 
          $scope.btns.forEach(function(btn) {
            if ($scope.tagList.indexOf(btn.tag) != -1) {
              $log.debug(btn.tag + " get true");
              btn.state = true;
            }
          })
        }
      });
 
    },

    link: function(scope, element, attrs, controller) {
      $log.debug("svgbuttongroup link");
      $log.debug(attrs);
    }
  }
}])

app.directive('svgbutton', ['$log', function($log) {
  $log.debug("svgbutton directive");

  return {
    require: '^svgbuttongroup',
    template: '<a href="" ng-class="{on: btn.state, off: !btn.state}" ng-click="select()"><svginline src="btn.image_src"/></a>',

    restrict: "EA",
    replace: true,
    scope: {},

    controller: function($scope) {
      $log.debug("svgbutton controller");

      $scope.btn = {};
    },

    link: function(scope, element, attrs, buttonGroupCtrl) {
      $log.debug("svgbutton link: ", attrs.value);
      $log.debug("svgbutton buttonGroupCtrl: ");
      $log.debug(buttonGroupCtrl);
      $log.debug(element);

      scope.btn = {
        state: false,
        tag: attrs.value,
        image_src: attrs.src
      };
      buttonGroupCtrl.addBtn(scope.btn);

      scope.select = function() {
        $log.debug("svgbutton select");
        buttonGroupCtrl.select(this.btn);
      }

      scope.$on('$destroy', function() {
        $log.debug("svgbutton scope destroy");
      });
    }
  }
}])



