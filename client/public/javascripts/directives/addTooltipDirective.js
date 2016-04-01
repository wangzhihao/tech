(function(angular) {
  angular.module('wordsApp').directive('wordsAddTooltip', function() {
    return {
    	restrict: 'A',
      link: function($scope, iElm, iAttrs, controller) {
        iElm.tooltip();
      }
    };
  });
}(angular));
