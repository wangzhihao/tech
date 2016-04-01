(function(angular) {
  angular.module('wordsApp')
    .factory('wordsService', wordsService);

  wordsService.$inject = ['Restangular'];

  function wordsService(Restangular) {
    var service = {
      getCount: getCount,
      getRandomList: getRandomList,
      getWords: getWords,
      removeWord: removeWord,
      saveWord: saveWord,
      search: search,
      updateWord: updateWord
    };

    var httpService = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://youaccomplish.com/technique/api');
    });

    return service;

    function getCount() {
      return httpService.all('words').one('count').get();
    }

    function getRandomList(number) {
      return httpService.all('words').one('random').get({
        number: number
      });
    }

    function getWords(filter) {
      return httpService.all('words').getList({
        filter: filter
      });
    }

    function removeWord(id) {
      return httpService.all('words').one(id).remove();
    }

    function saveWord(word) {
      return httpService.all('words').post(word);
    }

    function search(text, records) {
      return httpService.all('words').one('search').get({
        text : text,
        records : records
      });
    }

    function updateWord(word) {
      return httpService.all('words').one(word.id).customPUT(word);
    }
  };
})(angular);
