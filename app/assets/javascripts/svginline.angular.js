angular.module('facetsKids.svginline', [])

.directive('svginline', function($compile, $http, $log) {
  return {
    restrict: 'EA',
    replace: true,

    link: function(scope, element, attrs) {
      $log.debug("svginline link");

      var imgID = element.attr('id');
      var imgClass = element.attr('class');
      var imgNgClass = element.attr('ng-class');
      var imgNgClick = element.attr('ng-click');
      var imgNgInit = element.attr('ng-init');
      var imgNgModel = element.attr('ng-model');
      var imgStyle = element.attr('style');

      //var imgURL = scope.$eval(attrs.src);
      //console.log("svginline src: " + attrs.src);
      scope.$watch(attrs.src, function(value) {
        $log.debug("svginline src watch value: " + value);
        if (value) {
          $http.get(value)
          .success( function(data) {
            var $svg = angular.element(data);

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass);
            }
            if(typeof imgNgClass !== 'undefined') {
              $svg = $svg.attr('ng-class', imgNgClass);
            }
            if (typeof imgStyle !== 'undefined') {
              $svg = $svg.attr('style', imgStyle);
            }
            if(typeof imgNgClick !== 'undefined') {
              $svg = $svg.attr('ng-click', imgNgClick);
            }
            if(typeof imgNgInit !== 'undefined') {
              $svg = $svg.attr('ng-init', imgNgInit);
            }
            if(typeof imgNgModel !== 'undefined') {
              $svg = $svg.attr('ng-model', imgNgModel);
            }
 
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            element.replaceWith($svg);
            $compile(element.contents())(scope);
          })
          .error(function(data, status) {
            $log.debug("http error");
          });
 
        }
      })
    }
  }
})



