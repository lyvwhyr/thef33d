/// <reference path="../../typings/index.d.ts" />



(function() {
  const appName: string = 'thef33d';

  function runBlock($log: ng.ILogService, AmazonSearchService: AmazonSearchService) {
    $log.debug('Angular Application initialized');
    let products = AmazonSearchService.searchByKeyword('Gundam');
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
