app.controller('AdminReportsController', ['$firebaseAuth','$http', '$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  //
  function getUsers(){
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
    })
  }

}]);
