(function(angular) {
  angular.module('wordsApp').directive('highlightNewWord', function() {
    return {
      restrict: 'A',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          // executes it in pre-link phase to ensure it's executed before its child, specifically, the <code>marked</code> directive which uses its result.
          //see http://stackoverflow.com/questions/22081140/how-to-execute-parent-directive-before-child-directive
          pre: function preLink($scope, iElement, iAttrs, controller) {
            //Whenever the context is changed, change the formattedContext.
            $scope.$watch('word.context', function(){
              $scope.word.formattedContext = highlight($scope.word.context, $scope.word.name);
            });
   
            // Find all occurrences of <code>name</code> in <code>context</code>and surround them with a pair of <code>`</code>. If <code>`</code> already exists, then reduce them to just one pair.
            function highlight(context, name) {
              var re = new RegExp("`*(" + name + ")`*", 'gim');
              return context.replace(re, '`$1`');
            }
          },
          post: angular.noop
        }
      }
    };
  });
}(angular));
