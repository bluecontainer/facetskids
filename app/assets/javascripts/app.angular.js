angular.module('tagListService', ['ngResource'])
.factory('TagListService', function($resource) {
  return $resource('/api/videos?tag_list=:tag');
});

var app = angular.module('facetsKidsApp', ['tagListService']);

app.controller('MainCtrl', function($scope, TagListService) {
  console.log("MainCtrl controller");

  $scope.$watch('result.selected_emotion', function(newValue, oldValue) {
    console.log('result.selected_emotion changed - ' + newValue);
    if (newValue != oldValue) {
      getVideoList(newValue);
      //var videos = EmotionListService.query({emotion: newValue}, function() {
      //  console.log("JsonServer.query callback update");
      //  console.log(videos);
      //  $scope.result.videos[newValue] = videos;
      //});
    }
  });

  $scope.result = new Object;
  $scope.result.selected_video = null;
  $scope.result.videos = {};

  $scope.result.selected_emotion = "home";
  //$scope.result.selected_emotion = "happy";
  //requestVideoList($scope.result.selected_emotion);
  $scope.result.curated_tag_list = [{name: "top_rated", label: "Top Rated"}, {name: "brand_new", label: "Brand New"}, {name: "picks_for_me", label: "Picks For Me"}, {name: "animation_antics", label: "Animation Antics"}];
  $scope.result.curated_tag_list.map ( function(item) {
    requestVideoList(item.name);
  });

  $scope.result.selectVideo = function(video) {
    //console.log('selectVideo');
    //console.log(video);
    $scope.result.selected_video = video;
  }

  $scope.result.getVideoList = getVideoList;

  function getVideoList(name) {
    console.log("getVideoList: " + name);
    console.log($scope.result.videos);
    if (!(name in $scope.result.videos)) {
      $scope.result.videos[name] = [];
      requestVideoList(name);
    }
    return $scope.result.videos[name];
  }

  //var videos = EmotionListService.query({emotion: $scope.result.selected_emotion}, function() {
  //  console.log("JsonServer.query callback init");
  //  console.log(videos);
  //  $scope.result.videos[$scope.result.selected_emotion] = videos;
  //});
  function requestVideoList(tag) {
    if (tag != 'home') {
      var videos = TagListService.query({tag: tag}, function() {
        console.log("TagListService.query callback");
        console.log(videos);
        $scope.result.videos[tag] = videos;
      });
    }
  }
});

app.directive('iosslider', ['$parse', function($parse) {  
  //console.log("iosslider directive");

  var defaultOptions = {
        desktopClickDrag: true,
  	snapToChildren: true,
    	//infiniteSlider: true,
    	//autoSlide: true,
    	//scrollbar: true,
        //scrollbarHide: false,
    	keyboardControls: true,
        elasticPullResistance: 0.9
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      //console.log("iosslider controller");
      //console.log($scope);
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        //console.log("addSlide");
        //console.log(slideElem)
        //console.log($scope.sliderElem);
        //console.log($scope.sliderElem.data('args'));
        $scope.sliderElem.iosSlider('addSlide', slideElem);
        $scope.sliderElem.iosSlider('goToSlide', 1);
      }

      this.updateSlide = function() {
        //console.log("updateSlide");
        //console.log($scope.sliderElem.data('args'));
        $scope.sliderElem.iosSlider('update');
      }
    },

    link: function(scope, elem, attrs) {
      console.log("iosslider link");

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSlider(options);
    }
  }
}])

app.directive('slide', function() {
  //console.log ("slide directive");

  return {
    require: '^iosslider',
    link: function(scope, element, attrs, sliderCtrl) {
      console.log("slide link");
      //console.log(sliderCtrl);
      //console.log(element);
      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        //console.log("slide scope destroy");
        sliderCtrl.updateSlide();
      });
    }
  }
})


app.directive('iosvslider', ['$parse', function($parse) {  
  console.log("iosvslider directive");

  var defaultOptions = {
        elasticPullResistance: 0.9,
        slideStartVelocityThreshold: 5
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      console.log("iosvslider controller");
      //console.log($scope);
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        console.log("addVSlide");
        //console.log(slideElem)
        if ($scope.sliderElem) {
          //console.log($scope.sliderElem);
          console.log($scope.sliderElem.data('args'));
 
          $scope.sliderElem.iosSliderVertical('addSlide', slideElem);
          $scope.sliderElem.iosSliderVertical('goToSlide', 1);
          $scope.sliderElem.iosSliderVertical('update');
        }
      }

      this.updateSlide = function() {
        console.log("updateVSlide");
        //console.log($scope.sliderElem.data('args'));
        if ($scope.sliderElem) {
          $scope.sliderElem.iosSliderVertical('update');
        }
      }
    },

    link: function(scope, elem, attrs) {
      console.log("iosvslider link");
      console.log(elem);

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSliderVertical(options);

      scope.$on('$destroy', function() {
        console.log("iosvslider scope destroy");
      });
    }
  }
}])

app.directive('vslide', function() {
  console.log ("vslide directive");

  return {
    require: '^iosvslider',
    link: function(scope, element, attrs, sliderCtrl) {
      console.log("vslide link");
      //console.log(sliderCtrl);
      console.log(element);
      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        console.log("vslide scope destroy");
        sliderCtrl.updateSlide();
      });
    }
  }
})

