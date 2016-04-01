(function(angular) {
  angular.module('wordsApp').directive('wordsDialogLocalization', function() {
    return {
    	restrict: 'A',
      link: function($scope, iElm, iAttrs, controller) {
       	iElm.on('show.bs.modal', function (event) {
       		var ctrl = $scope.wordsCtrl;
				  if(ctrl.newWord.id){
				  	//This is supposed to be a UPDATE operation.
				  	iElm.find('.modal-title').text('Edit the word');
				  	iElm.find('.words-action').text('Save changes');
				  }else{
						//This is supposed to be a CREATE operation.
				  	iElm.find('.modal-title').text('Add a word');
				  	iElm.find('.words-action').text('Add a word');
				  }
				  if(!ctrl.newWord.examples){
				  	$scope.wordsCtrl.newWord.examples = [];
				  }
				});
      }
    };
  });
}(angular));
