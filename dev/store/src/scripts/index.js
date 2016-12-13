/// <reference path="../../typings/index.d.ts" />
(function () {
    var appName = 'thef33d';
    function runBlock($log, AmazonSearchService) {
        $log.debug('Angular Application initialized');
        var products = AmazonSearchService.searchByKeyword('Gundam');
    }
    angular
        .module(appName, [])
        .constant('_', _)
        .constant('moment', moment)
        .service('AmazonSearchService', AmazonSearchService)
        .controller('ProductViewController', ProductViewController)
        .controller('HeaderViewController', HeaderViewController)
        .run(runBlock);
})();
