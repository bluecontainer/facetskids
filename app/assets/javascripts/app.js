angular.module('tagListService', ['ngResource'])
.factory('TagListService', function($resource) {
  return $resource('/api/videos?tag_list=:tag');
});

var app = angular.module('facetsKidsApp', ['tagListService']);

app.controller('MainCtrl', function($scope, TagListService) {
  console.log("MainCtrl controller");

  $scope.$watch('result.selected_emotion', function(newValue, oldValue) {
    //console.log('result.selected_emotion changed - ' + newValue);
    if (newValue != oldValue) {
      requestVideoList(newValue);
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

  $scope.result.selected_emotion = "happy";
  requestVideoList($scope.result.selected_emotion);

  $scope.result.curated_tag_list = ["top_rated", "brand_new", "picks_for_me", "animation_antics"];
  $scope.result.curated_tag_list.map ( function(item) {
    requestVideoList(item);
  });

  $scope.result.selectVideo = function(video) {
    //console.log('selectVideo');
    //console.log(video);
    $scope.result.selected_video = video;
  }

  $scope.result.getVideoList = function(name) {
    //console.log("getVideoList");
    if (!name in $scope.result.videos) {
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
    var videos = TagListService.query({tag: tag}, function() {
      //console.log("TagListService.query callback");
      //console.log(videos);
      $scope.result.videos[tag] = videos;
    });
  }
});

app.directive('iosslider', ['$parse', function($parse) {  
  //console.log("iosslider directive");

  var defaultOptions = {
        desktopClickDrag: true,
    		snapToChildren: true,
    		//infiniteSlider: true,
    		//autoSlide: true,
    		scrollbar: true,
                scrollbarHide: false,
    		keyboardControls: true    
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
      //console.log("iosslider link");

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
      //console.log("slide link");
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
