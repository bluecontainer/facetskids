
angular.module('facetsKids.marquee', [])

.directive('marquee', function($log, $timeout) {
  return {
    restrict: 'EA',

    link: function(scope, elem, attrs) {
      $log.info("marquee link");

      $timeout(function() {

        var boxWidth = elem.width();
        var textWidth = $('.scroll-text', elem).width();
        var animSpeed = textWidth * 20;

        function doAnimation() {
          elem.animate(
            {
              scrollLeft: (textWidth - boxWidth)
            }, 
            animSpeed, 
            function () {
              elem.animate(
                {
                  scrollLeft: 0
                }, 
                animSpeed, 
                function () {
                  doAnimation();
                }
              );
            }
          );
	}

        if (textWidth > boxWidth) {
          doAnimation();
        }
      }, 0);
    } 
  };
});
