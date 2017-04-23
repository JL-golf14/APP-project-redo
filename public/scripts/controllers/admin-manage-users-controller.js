
app.controller('AdminManageUsersController', ['$http', '$location', 'AdminFactory', '$firebaseAuth', function($http, $location, AdminFactory, $firebaseAuth){

  var self = this;
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {
   if (firebaseUser) {
     console.log('we are still logged in!');
     self.email = firebaseUser.email;
     // go reload idea data....
     AdminFactory.init();
   } else {
     console.log('boooo');
     // redirect
    //  self.email = '';
    //  self.logout();
   }
  });

  self.allUsers = AdminFactory.allUsers;

  self.deactivateUser = function(userId) {
    AdminFactory.deactivateUser(userId);
  };

  self.reactivateUser = function(userId) {
    AdminFactory.reactivateUser(userId);
  };

  self.filterList = AdminFactory.filterList;

  self.searchUsers = AdminFactory.searchUsers;

  self.userFilter = AdminFactory.userFilter;

  self.userResults = AdminFactory.userResults;

}]); //end of controller
