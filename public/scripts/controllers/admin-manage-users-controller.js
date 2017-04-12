app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();


  self.allUsers = DataFactory.allUsers;

  self.deactivateUser = function(userId) {
   DataFactory.deactivateUser(userId);
 };

}]); //end of controller
