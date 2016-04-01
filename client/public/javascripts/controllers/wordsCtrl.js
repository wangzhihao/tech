(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService', 'wordSelectionService', 'wordsLocalService'];

	function wordsCtrl(wordsService, wordSelectionService, wordsLocalService){
		var ctrl = this;

		ctrl.LINE_HEAD = /(^|\n)/g;
		ctrl.localService = wordsLocalService;
		ctrl.todayNumber = 5;
		ctrl.recentNumber = 5;
		ctrl.newWord = initialWord();
		ctrl.saveFlag = 0;
		ctrl.tab = 0;
		//To support full-text search
		ctrl.searchText = '';
		ctrl.searchRecords = 5;

		ctrl.addNewExample = addNewExample;
		ctrl.editWord = editWord;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;
		ctrl.search = search;
		
		init();
		function init(){
			wordSelectionService.randomSelect(ctrl.todayNumber, ctrl.localService);
			wordSelectionService.recent(ctrl.recentNumber, ctrl.localService);
		}

		function search(){
			if(ctrl.searchText && ctrl.searchText.trim() !== ''){
				ctrl.localService.clearSearchCache();
				//search results tab.
				ctrl.tab = 2;
				wordsService.search(ctrl.searchText, ctrl.searchRecords).then(function(data){
					ctrl.localService.addToSearchCache(data.words);
				});
			}
		}

		function addNewExample(word){
			if( !word.examples ){
				word['examples'] = []
			}
			word.examples.push({
				type : 'Text',
				value : ''
			});
		}

		function editWord(word){
			ctrl.reset(word);
			$('#editWord').modal();
		}

		function initialWord(){
			return {
				examples : []
			};
		}

		function reset(word){
			if(word){
				//deep copy.
				ctrl.newWord = jQuery.extend(true, {}, word);
			}else{
				var source = ctrl.newWord.source;
				var context = ctrl.newWord.context;
				ctrl.newWord = initialWord();
				//keep the last source and context when adding a new word.
				ctrl.newWord['source'] = source;
				ctrl.newWord['context'] = context;
			}
			ctrl.saveFlag = 0;
		}

		function removeWord(word){
			wordsService.removeWord(word.id).then(function(data){
				ctrl.localService.removeWordLocal(word);
			});
		}

		function saveWord(word){
			ctrl.saveFlag = 0;
			if(word.id){
				wordsService.updateWord(word).then(function(data){
					ctrl.saveFlag = 1;
					ctrl.localService.editWordLocal(word);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}else{
				word['create-date'] = new Date();
				wordsService.saveWord(word).then(function(data){
					ctrl.saveFlag = 1;
					ctrl.localService.addWordLocal(data);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}
		}
	};
})(angular);