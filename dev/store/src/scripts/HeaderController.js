

  function HeaderController(AmazonSearchService) {
    var vm = this;
    vm.searchQuery = '';
    vm.sideBarOpen = false;
    vm.openSideBar = openSideBar;
    vm.closeSideBar = closeSideBar;
    vm.toggleSideBar = toggleSideBar;
    vm.onSearch = onSearch;

    function onSearch() {
      console.log('onSearch()', vm.searchQuery);
      AmazonSearchService.searchByKeyword(vm.searchQuery);
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

