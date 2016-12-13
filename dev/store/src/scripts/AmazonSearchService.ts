/// <reference path="../../typings/index.d.ts" />


class AmazonSearchService {
  private baseURl: string;
  private keyword: string;
  private products: Array<any>;
  private searchIndex: number;
  private tag: string;
  private searchTimeOut: number;
  private searchLimit: number;

  // dependencies would be injected here
  constructor(public $log, public $http, public $rootScope) {
    this.tag = 'Amazon Search: ';
    this.searchLimit = 10;
    this.searchIndex = 0;
    // search in milliseconds
    this.searchTimeOut = 10000;
    this.products = [];
    this.baseURl = 'http://amazon-feralcode.rhcloud.com/search/';
  }

  searchByKeyword(keyword: string) {
    let that = this;
    this.keyword = keyword;
    let url = this.baseURl +  this.keyword;

    return this.$http.get(url)
      .then(function (result) {
        that.products = result.data.data.products;
        console.log(that.tag, ': data from amazon search', that.products);
        that.$rootScope.$broadcast('productSearch:updated', that.products);
        return that.products;
      })
      .catch(function (e: Error) {
        console.log(this.tag , ': search: error occurred while querying');
        console.log(e);
      });
  }

}
