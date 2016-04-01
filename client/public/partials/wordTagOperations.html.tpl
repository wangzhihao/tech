<div class="operations">
  <a class="search-on-google operation" ng-href="https://www.google.com/search?q=define+{{word.name}}" ng-click="$event.stopPropagation()" class="google-define" target="_blank" data-toggle="tooltip" data-placement="top" title="search on google" words-add-tooltip><span class="fa fa-google black" aria-hidden="true"></span></a>
  <a class="search-on-oed operation" ng-href="http://www.etymonline.com/index.php?search={{word.name}}" ng-click="$event.stopPropagation()" class="oed-define" target="_blank" data-toggle="tooltip" data-placement="top" title="etymology online" words-add-tooltip><span class="fa fa-book black" aria-hidden="true"></span></a>
  <div class="dangerous-operations">
    <a class="edit operation" ng-click="wordsCtrl.editWord(word); $event.stopPropagation()" data-toggle="tooltip" data-placement="top" title="edit it" words-add-tooltip><span class="glyphicon glyphicon-pencil black" aria-hidden="true"></span></a>
    <a class="delete operation" ng-click="wordsCtrl.removeWord(word); $event.stopPropagation()" data-toggle="tooltip" data-placement="top" title="delete it" words-add-tooltip><span class="glyphicon glyphicon-remove black" aria-hidden="true"></span></a>
  </div>
</div>