/// <reference path="../../typings/index.d.ts" />
function HeaderViewController($scope, amazon, $log) {
    var vm = this;
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
