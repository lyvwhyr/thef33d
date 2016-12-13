/// <reference path="../../typings/index.d.ts" />


interface IHeaderViewController extends ng.IScope {
  searchQuery: string;
  sideBarOpen: boolean;
  openSideBar();
  closeSideBar();
  toggleSideBar();
  onSearch();
}

function HeaderViewController($scope: IHeaderViewController, amazon: AmazonSearchService, $log) {
  let vm = this;
  $scope.searchQuery = '';
  $scope.sideBarOpen = false;
  $scope.openSideBar = openSideBar;
  $scope.closeSideBar = closeSideBar;
  $scope.toggleSideBar = toggleSideBar;
  $scope.onSearch = onSearch;

  function onSearch() {
    $log.debug('onSearch()', vm.searchQuery);
    amazon.searchByKeyword(vm.searchQuery);
  }

  function closeSideBar() {
    vm.sideBarOpen = false;
  }

  function openSideBar() {
    vm.sideBarOpen = true;
  }

  function toggleSideBar() {
    vm.sideBarOpen = !vm.sideBarOpen;
    console.log('ToggleSideBar()');
  }

}
