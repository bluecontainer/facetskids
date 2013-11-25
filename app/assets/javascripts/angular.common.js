var commonElements = angular.module("commonElements", []);

commonElements.directive('iosslider', ['$parse', function($parse) {  
  console.log("iosslider directive");

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
      console.log("iosslider controller");
      console.log($scope);
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        //console.log(slideElem)
        //console.log($scope.sliderElem)
        $scope.sliderElem.iosSlider('addSlide', slideElem);
      }

      this.updateSlide = function() {
        //console.log("updateSlide")
        $scope.sliderElem.iosSlider('update')
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

commonElements.directive('slide', function() {
  console.log ("slide directive");

  return {
    require: '^iosslider',
    link: function(scope, element, attrs, sliderCtrl) {
      console.log("slide link");
      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        console.log("slide scope destroy");
        sliderCtrl.updateSlide();
      });
    }
  }
})

