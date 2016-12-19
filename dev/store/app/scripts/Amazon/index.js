/// <reference path="../../../typings/index.d.ts" />
"use strict";
var $ = require('jquery');
var Search = (function () {
    function Search() {
        this.baseUrl = 'http://amazon-feralcode.rhcloud.com/search/';
    }
    Search.prototype.searchByKeyword = function (keyword) {
        //replace spaces with dashes
        this.searchKeyword = keyword.trim().replace(/ /g, '-');
        ;
        var reqUrl = this.baseUrl + this.searchKeyword;
        return $.ajax(reqUrl);
    };
    return Search;
}());
exports.Search = Search;
