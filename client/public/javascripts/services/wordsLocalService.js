(function(angular) {
  angular.module('wordsApp')
    .factory('wordsLocalService', wordsLocalService);

  function wordsLocalService() {
    var service = {
    	addToTodayCache : addToTodayCache,
    	addToRecentCache : addToRecentCache,
      addToSearchCache : addToSearchCache,
      getSearchCache : getSearchCache,
    	getTodayCache : getTodayCache,
    	getRecentCache : getRecentCache,
      clearSearchCache : clearSearchCache,
      addWordLocal: addWordLocal,
      removeWordLocal: removeWordLocal,
      editWordLocal: editWordLocal
    };

    var _todayCache = [],
      _recentCache = [],
      _searchCache = [],
      //all word list caches.
      _caches = [_todayCache, _recentCache, _searchCache];

    return service;
    function clearSearchCache(){
      _searchCache.splice(0, _searchCache.length);
    }

    function getSearchCache(){
      return _searchCache;
    }

    function getTodayCache(){
    	return _todayCache;
    }

    function getRecentCache(){
    	return _recentCache;
    }

    function addToSearchCache(data){
      _addToCache(_searchCache, data);
    }

    function addToTodayCache(data){
    	_addToCache(_todayCache, data);
    }

    function addToRecentCache(data){
    	_addToCache(_recentCache, data);
    }

    /**
     *	cache is reference, we should not point it to others.
     */
    function _addToCache(cache, data){
    	if($.isArray(data)){
    		$.each(data, function(index, value){
    			cache.push(value);
    		});
    	}else{
    		cache.push(data);
    	}
    }

    /**
     * Replace the old word with the new word in every cache.
     */
    function editWordLocal(newWord) {
      jQuery.each(_caches, function(index, cache) {
        if (cache) {
          for (var i = cache.length - 1; i >= 0; i--) {
            if (cache[i].id === newWord.id) {
              cache.splice(i, 1, newWord);
            }
          }
        }
      });
    };
    /**
     * Add the new word in the beginning of recent word list cache.
     */
    function addWordLocal(newWord) {
      if (_recentCache) {
        _recentCache.unshift(newWord);
      }
    };

    /**
     * Remove the word in every cache.
     */
    function removeWordLocal(word) {
      jQuery.each(_caches, function(index, cache) {
        if (cache) {
          for (var i = cache.length - 1; i >= 0; i--) {
            if (cache[i].id === word.id) {
              cache.splice(i, 1);
            }
          }
        }
      });
    };
  };
})(angular);
