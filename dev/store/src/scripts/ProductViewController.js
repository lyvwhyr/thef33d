/// <reference path="../../typings/index.d.ts" />
function ProductViewController($scope) {
    var vm = $scope;
    vm.productDetailActive = false;
    vm.viewProductDetail = viewProductDetail;
    vm.closeProductDetail = closeProductDetail;
    vm.products = [];
    vm.currentProductId = null;
    vm.loading = true;
    /*
      @description triggered when product search results are updated
     */
    vm.$on('productSearch:updated', function (event, products) {
        vm.loading = false;
        vm.products = products;
        console.log(products);
        vm.currentProductId = null;
        vm.productDetailActive = false;
    });
    function viewProductDetail(productId) {
        console.log('ProductID selected ', productId);
        vm.currentProductId = productId;
        vm.productDetailActive = true;
    }
    function closeProductDetail() {
        vm.currentProductId = null;
        vm.productDetailActive = false;
    }
}
