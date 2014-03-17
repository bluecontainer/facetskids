
angular.module('facetsKids.marquee', [])

.directive('marquee', function($log, $timeout, $interval) {
  return {
    restrict: 'EA',

    link: function(scope, elem, attrs) {
      $log.debug("marquee link");

      $timeout(function() {

        var boxWidth = elem.width();
        var textElem = $('.scroll-text', elem);
        var textWidth = textElem.width();
        var animSpeed = textWidth * 20;

        function doAnimation() {
          textElem.animate(
            {
              //scrollLeft: (textWidth - boxWidth)
              left: -(textWidth - boxWidth)
            }, 
            animSpeed, 
            function () {
              textElem.animate(
                {
                  //scrollLeft: 0
                  left: 0
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
          //doAnimation();
          $interval(function() {
            startPos = move(textElem[0])
              .to(0)
              .duration('3s');
            move(textElem[0])
              .to(-(textWidth - boxWidth))
              .duration('3s')
              .end(startPos);
            /*
            TweenMax.to(textElem, 3, {left: -(textWidth - boxWidth), onComplete: function() {
              TweenMax.to(textElem, 3, {left: 0});
            }});
            */
          }, 8000);
          //
        }
      }, 0);
    } 
  };
});
