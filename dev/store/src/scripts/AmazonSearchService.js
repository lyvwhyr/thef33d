/// <reference path="../../typings/index.d.ts" />
var AmazonSearchService = (function () {
    // dependencies would be injected here
    function AmazonSearchService($log, $http, $rootScope) {
        this.$log = $log;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.tag = 'Amazon Search: ';
        this.searchLimit = 10;
        this.searchIndex = 0;
        // search in milliseconds
        this.searchTimeOut = 10000;
        this.products = [];
        this.baseURl = 'http://amazon-feralcode.rhcloud.com/search/';
    }
    AmazonSearchService.prototype.searchByKeyword = function (keyword) {
        var that = this;
        this.keyword = keyword;
        var url = this.baseURl + this.keyword;
        return this.$http.get(url)
            .then(function (result) {
            that.products = result.data.data.products;
            console.log(that.tag, ': data from amazon search', that.products);
            that.$rootScope.$broadcast('productSearch:updated', that.products);
            return that.products;
        })
            .catch(function (e) {
            console.log(this.tag, ': search: error occurred while querying');
            console.log(e);
        });
    };
    return AmazonSearchService;
}());
