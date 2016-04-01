(function(angular) {
  angular.module('wordsApp').directive('wordTag', function($timeout) {
    return {
      templateUrl : 'js/words/partials/wordTag.html.tpl',
      restrict: 'AE',
      //wordsCtrl should support editWord() and removeWord()
      scope: { 
        word: '=wordEntry',
        wordsCtrl : '=ctrlEntry'
       },
      link: function($scope, iElm, iAttrs, controller) {
        $scope.operationsPartial = 'js/words/partials/wordTagOperations.html.tpl';
        $scope.toggleFlip = toggleFlip;

        var front = iElm.find('.front'),
            back = iElm.find('.back'),
            flipper = iElm.find('.flipper'),
            flipContainer = iElm.find('.flip-container');
        
        function toggleFlip() {
          flipContainer.toggleClass('flip1');
          flipper.one("transitionend", function(e){ 
              //console.log(e);
              //swap the position value between front and back.
              var css = front.css('position');
              front.css('position', back.css('position'));
              back.css('position', css);
              flipContainer.toggleClass('flip2');
            }
          ); 
        }
      }
    };
  });
}(angular));
