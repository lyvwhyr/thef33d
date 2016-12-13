/// <reference path="../../typings/index.d.ts" />


interface IProductViewController extends ng.IScope {
  products: Array<any>;
  currentProductId: string;
  productDetailActive: boolean;
  loading: boolean;
  viewProductDetail(productId: string);
  closeProductDetail();
  toggleSideBar();
}

function ProductViewController($scope: IProductViewController) {
  let vm = $scope;
  vm.productDetailActive = false;
  vm.viewProductDetail = viewProductDetail;
  vm.closeProductDetail = closeProductDetail;
  vm.products = [];
  vm.currentProductId = null;
  vm.loading = true;

  /*
    @description triggered when product search results are updated
   */
  vm.$on('productSearch:updated', function(event: ng.IAngularEvent, products) {
    vm.loading = false;
    vm.products = products;
    console.log(products);
    vm.currentProductId = null;
    vm.productDetailActive = false;
  });

  function viewProductDetail(productId: string) {
    console.log('ProductID selected ',  productId);
    vm.currentProductId = productId;
    vm.productDetailActive = true;
  }

  function closeProductDetail() {
    vm.currentProductId = null;
    vm.productDetailActive = false
  }


}
