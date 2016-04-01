(function(angular){
	angular.module('wordsApp', [
		'restangular',
		'ngAnimate',
		'hc.marked'
		])

	.config(function($sceDelegateProvider) {
	  $sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	    // Allow loading from our assets domain.  Notice the difference between * and **.
	    'http://*.youtube.com/**',
	    'https://*.youtube.com/**'
	  ]);
	})

	.config(['markedProvider', function(markedProvider) {
    markedProvider.setOptions({
    	gfm: true,
    	tables : true
    });
  }]);
})(angular);