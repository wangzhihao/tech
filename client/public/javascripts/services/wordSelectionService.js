(function(angular) {
  angular.module('wordsApp')
    .factory('wordSelectionService', wordSelectionService);

  wordSelectionService.$inject = ['wordsService'];

  function wordSelectionService(wordsService) {
    var service = {
      randomSelect: randomSelect,
      recent: recent 
    };

    /**
     * Select N records randomly. The methodology here is to generate a random array and then pick one item from backend
     * database each time.
     * @param number the number of N.
     * @service service which contains 'todayCache' field.
     */
    function randomSelect(number, service) {
    	wordsService.getRandomList(number).then(function(data){
    		for(var list = data.list, i = list.length - 1; i >= 0; i--){
          var filter = {};
          filter['offset'] = list[i];
          filter['limit'] = 1;
     			wordsService.getWords(filter).then(function(data){
            //console.log(data);
    				service.addToTodayCache(data);
    			});
    		}
    	});
    }

    function recent(number, service){
      var filter = {};
      filter['offset'] = 0;
      filter['limit'] = number;
      filter['order'] = 'create-date DESC';
      wordsService.getWords(filter).then(function(data){
        service.addToRecentCache(data);
      });
    }
    return service;
  };
})(angular);
