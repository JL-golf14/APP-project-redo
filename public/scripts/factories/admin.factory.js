
app.factory('AdminFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){


  var allUsers = {list: []};
  var filterList = {list: []};
  var userFilter = {};
  var userResults = {list: []};
  var  ideaToFlagObject = {list: []};
  // init(); //run

  //startup functions
  function init() {
    getUsers();
    filterUsers();
  }

  //function to display user list on manage users admin view
  function getUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method: 'GET',
          url: '/admin/manageUsers',
          headers: {
            id_token: idToken
          }
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
      });
    }
  }

  //function to deactivate user profile
  function deactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
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
            url: '/admin/deactivateUser/' + userId,
            headers: {
              id_token: idToken
            }
          }).then(function(response) {
            console.log('user marked as inactive');
            init();
          });
        })
      });
    }
  }


  //function to reactivate user profile
  function reactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
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
            url: '/admin/reactivateUser/' + userId,
            headers: {
              id_token: idToken
            }
          }).then(function(response) {
            console.log('user marked as active');
            init();
          });
        })
      });
    }
  }


//function to filter user search on admin manage users view
function filterUsers() {
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth()
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'GET',
        url: '/admin/filterUsers',
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        filterList.list = response.data;
        console.log('filterList', filterList.list);
      })
    });
  }
}

//function to search users on admin manage users view
function searchUsers() {
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth()
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'GET',
        url: '/admin/searchUsers',
        headers: {
          id_token: idToken,
          searchString: userFilter.searchString,
          filter: userFilter.filter.filter
        }
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
    });
  }
}

 function getAllFlaggedItems () {
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
  $http({
    method: 'GET',
    url: '/admin/allFlags',
    headers: {
      id_token: idToken
    }
    // headers:flagObject
  }).then(function(response) {
   ideaToFlagObject.list = response.data;
  });
  });
}
}//end of getComments()


function updateFlaggedItem (flags){

}    /// NEEED TO FINISH


function deleteFlaggedItem(flags){
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth()
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      console.log(flags);
      var data = flags;
      console.log("this is the data.......",data);
      if (data.ideas_id && data.idea_flag_description !== null ) {


        $http({
          method: 'DELETE',
          url: '/admin/deleteIdeaFlag/' + flags.ideas_id +'/'+flags.user_id,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {

        });
      }else{
        $http({
          method: 'DELETE',
          url: '/admin/deleteCommentFlag/' + flags.comment_id  +'/'+flags.user_id,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {

        });
      }
    })
  }
}
function deleteItem(flags){
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth()
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      console.log(flags);
      var data = flags;
      console.log("this is the data.......",data);
      if (data.ideas_id && data.idea_flag_description !== null ) {


        $http({
          method: 'DELETE',
          url: '/admin/deleteIdea/' + flags.ideas_id +'/'+flags.user_id,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {

        });
      }else{
        $http({
          method: 'DELETE',
          url: '/admin/deleteComment/' + flags.comment_id  +'/'+flags.user_id,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {

        });
      }
    })
  }
}


    return {
      allUsers: allUsers,
      ideaToFlagObject:ideaToFlagObject,
      getAllFlaggedItems:getAllFlaggedItems,
    deleteFlaggedItem: deleteFlaggedItem,
    updateFlaggedItem: updateFlaggedItem,
      deactivateUser: deactivateUser,
      reactivateUser: reactivateUser,
      filterList: filterList,
      searchUsers: searchUsers,
      userFilter: userFilter,
      userResults: userResults,
      init: init
    }

  }]); // end of app.factory
