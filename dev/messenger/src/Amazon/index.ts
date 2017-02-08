import * as $ from 'jquery';

export class Search {
  baseUrl: string;
  searchKeyword: string;
  productData: Array<any>;

  constructor() {
    this.baseUrl = 'http://amazon-feralcode.rhcloud.com/search/';
  }

  searchByKeyword(keyword: string) {
    // replace spaces with dashes
    this.searchKeyword = keyword.trim().replace(/ /g, '-');;
    let reqUrl = this.baseUrl + this.searchKeyword;
    return $.ajax(reqUrl);
  }
}
