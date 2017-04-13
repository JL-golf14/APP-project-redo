app.factory('DataFactory', ['$http', function($http){

  var allUsers = {list: []};
  var filterList = {list: []};
  var userFilter = {};
  var userResults = {list: []};

  init();

  //startup functions
  function init() {
    getUsers();
    filterUsers();
  }

  //function to display user list on manage users admin view
  function getUsers() {
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
      for (var i = 0; i < allUsers.list.length; i++) {
        if(allUsers.list[i].ideas_flags_count == null){
          allUsers.list[i].ideas_flags_count = 0;
        }
        if(allUsers.list[i].comments_flags_count == null){
          allUsers.list[i].comments_flags_count = 0;
        }
        if(allUsers.list[i].subflags_count == null){
          allUsers.list[i].subflags_count = 0;
        }
      }
    })
  }

  //function to deactivate user profile
  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init();
      });
    })
  }

  //function to reactivate user profile
  function reactivateUser(userId) {
    console.log('reactivate user button clicked');
    console.log(userId);
    swal({
      title: 'Reactivate User',
      text: "Are you sure you want to reactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/reactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as active');
        init();
      });
    })
  }

  //function to filter user search on admin manage users view
  function filterUsers() {
    $http({
      method: 'GET',
      url: '/admin/filterUsers'
    }).then(function(response){
      filterList.list = response.data;
      console.log(filterList.list);
    })
  }

  //function to search users on admin manage users view
  function searchUsers() {
    $http({
      method: 'GET',
      url: '/admin/searchUsers',
      headers: {
        searchString: userFilter.searchString,
        filter: userFilter.filter.filter
      }
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
    })
  }


  return {
    allUsers: allUsers,
    deactivateUser: deactivateUser,
    reactivateUser: reactivateUser,
    filterList: filterList,
    searchUsers: searchUsers,
    userFilter: userFilter,
    userResults: userResults
  }

}]); // end of app.factory
