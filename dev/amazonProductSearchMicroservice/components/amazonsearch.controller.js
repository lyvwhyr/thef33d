/* jshint undef: true, unused: true */
/* global console, require, module */

// var log = require('./../libs/log');
const aws = require('aws-lib');
const _ = require('lodash');

// Create amazon API operation client
const prodAdv = aws.createProdAdvClient(
  'AKIAJTJZY5QMZ7Q4NIKA',
  'IP2rxLUkXu2mSDo0BP+svSzo6esWP4ZZlXZ3WVCp',
  'thef33dassoc-20');

// GUID creation
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

// function to parse individual products
function parseProduct(product) {
  var parsedProduct = null;

  try {
    var cheapestPrice = null;
    var offers = [];
    // add list price by default
    /*
     var listPrice = _.get(product, 'ItemAttributes.ListPrice');
     if (listPrice) {
     var payload = {
     listingID:  _.get(product, 'ItemAttributes.OfferListingId'),
     price:      _.get(product, 'ItemAttributes.Price.FormattedPrice'),
     condition:  _.get(product, 'ItemAttributes.Condition')
     };
     offers.push(payload);
     cheapestPrice = listPrice;
     }*/

    var tempOffers = _.get(product, 'Offers.Offer');
    _.each(tempOffers, function (offer) {
      var payload = {
        listingID: _.get(offer, 'OfferListing.OfferListingId'),
        price: _.get(offer, 'OfferListing.Price.FormattedPrice'),
        condition: _.get(offer, 'OfferAttributes.Condition')
      };
      offers.push(payload);
    });

    var imageSet = [];
    var tempImageSets = _.get(product, 'ImageSets.ImageSet');
    if (tempImageSets) {
      _.each(tempImageSets, function (imgSrc) {
        var largeImage = _.get(imgSrc, 'LargeImage.URL');
        if (largeImage) {
          imageSet.push({ url: largeImage });
        }
      });
    }

    var similar = [];
    var tempSimilarItemSet = _.get(product, 'SimilarProducts.SimilarProduct');
    if (tempSimilarItemSet) {
      _.each(tempSimilarItemSet, function (item) {
        similar.push({
          asin: _.get(item, 'ASIN'),
          title: _.get(item, 'Title')
        });
      });
    }

    // get cheapest new or used price
    cheapestPrice = _.get(product,
      'OfferSummary.LowestNewPrice.FormattedPrice') ||
      _.get(product, 'OfferSummary.LowestUsedPrice.FormattedPrice');

    // final parsed product object
    parsedProduct = {
      asin: _.get(product, 'ASIN'),
      name: _.get(product, 'ItemAttributes.Title'),
      features: _.get(product, 'ItemAttributes.Feature'),
      largeImage: _.get(product, 'LargeImage.URL'),
      mediumImage: _.get(product, 'MediumImage.URL'),
      smallImage: _.get(product, 'SmallImage.URL'),
      imageSet: imageSet,
      description: _.get(product, 'EditorialReviews.EditorialReview.Content'),
      cheapestPrice: cheapestPrice,
      offers: offers,
      similar: similar,
      link: _.get(product, 'DetailPageURL'),
      pid: guid()
    };

  } catch (e) {
    console.log(e);
  }
  // return parsed product data
  return parsedProduct;
}


// return raw search results as json
function renderSearcResultsAsJson(data, options, res) {
  res.end(JSON.stringify({ data, options }));
}

// render product results page
function renderSearchResultsAsPage(data, options, res) {
  let pageData = {};
  pageData.keyword = _.startCase(options.Keywords);
  pageData.pageTitle = options.Keywords;
  pageData.pageIndex = options.ItemPage;
  pageData.cache = false;
  pageData.products = [];
  // log.info(JSON.stringify(data.ItemSearchResponse.Items[0]));
  // pageData.products = data.ItemSearchResponse.Items[0].Item;

  _.each(data.Items.Item, (product) => pageData.products.push(parseProduct(product)));

  // if pageIdex is passed in query just return items
  // else render entire page
  if (options.ItemPage) {
    pageData.layout = false;
  }
  res.end(JSON.stringify({ data: pageData, options }));
  // render product card view
  // res.render('productCard', pageData);
}


// encode(decode) html text into html entity
function decodeHtmlEntity(str) {
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

function replaceDashesWithSpaces(str) {
  return str.replace(/-/g, ' ')
}

// function to execute amazon product search
function executeSearch(options, res, onSearchResults) {
  let startDate;
  let endDate;
  let requestTime;

  startDate = new Date();
  var queryOptions = {
    'ItemPage': '1',
    'SearchIndex': 'All',
    'Keywords': 'gundam wing',
    'Availability': 'Available',
    'ResponseGroup': 'Images,ItemAttributes,Offers,Accessories,EditorialReview,OfferSummary,Reviews,Similarities'
  };
  // extended
  _.assign(queryOptions, options);
  // perform query and run onSearchResults after it is complete
  prodAdv.call('ItemSearch', queryOptions, function (err, data) {
    if (data) {
      console.log(data);
    }
    // throw error if present
    if (err) {
      return new Error(err);
    }
    endDate = new Date();
    requestTime = (endDate - startDate) / 1000;

    console.log('----------------------------------');
    console.log('request time - ' + requestTime);
    console.log('----------------------------------');
    // run onSearchResults callback function
    onSearchResults(data, options, res);
  });
}

function getProductsByKeywordRaw(keyword, res) {
  var keywords = decodeHtmlEntity(keyword);
  var keywords = replaceDashesWithSpaces(keywords);
  // create search option var
  var options = {
    'Keywords': keywords,
  };
  // search for item and render JSON data
  executeSearch(options, res, renderSearcResultsAsJson);
}

function getProductsByKeyword(keyword, res) {
  let keywords = decodeHtmlEntity(keyword);
  keywords = replaceDashesWithSpaces(keywords);
  // we use dash seperated words for SEO
  // var page = _.parseInt(req.query.page) || null;
  // create search option var
  const options = {
    Keywords: keywords,
    ItemPage: 1,
  };
  // search for item and render view
  executeSearch(options, res, renderSearchResultsAsPage);
}

module.exports = {
  getProductsByKeywordRaw,
  getProductsByKeyword,
};
