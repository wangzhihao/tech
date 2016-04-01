<div class="flip-container single-word"
    ng-dblClick="toggleFlip()">
    <div class="flipper">
        <div class="front jumbotron">
            <p>
                <span class="label label-default">Context</span>
            </p>
            <div highlight-new-word>
                <div marked="word.formattedContext || ''"></div>
            </div>
            <div class="source" ng-if="word.source && word.source.trim() !== '' " marked=" '--From ' + word.source"></div>
            <div ng-include="operationsPartial"></div>
        </div>
        <div class="back jumbotron">
            <p>
                <span class="label label-primary" ng-bind="word.name"></span>
            </p>
            <div ng-if="word.definition">
                <div marked="word.definition"></div>
            </div>
            <div ng-if="word.examples.length">
                <p ng-repeat="example in word.examples">
                    <span ng-if="example.type === 'Text' " ng-bind="example.value"></span>
                    <img ng-if="example.type === 'Image'" ng-src="{{example.value}}">
                    <iframe ng-if="example.type === 'Video'" width="640" height="390" ng-src="{{example.value}}" frameborder="0" allowfullscreen></iframe>
                </p>
            </div>
            <div ng-include="operationsPartial"></div>
        </div>
        <div class="clear"></div>
    </div>
</div>
