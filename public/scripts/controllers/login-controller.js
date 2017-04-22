app.controller('LoginController', ['DataFactory', 'TopicsFactory', '$firebaseAuth', '$http', '$location', '$scope', function(DataFactory, TopicsFactory, $firebaseAuth, $http, $location, $scope){

  //google authenticate bellow
  var auth = $firebaseAuth();
  var self = this;
  var firebaseUser = auth.$getAuth();
    // var notyf = new Notyf();

  TopicsFactory.checkAdminStatus().then(function(response){
    self.isAdmin = TopicsFactory.isAdmin;
  });
  // self.isAdmin = TopicsFactory.isAdmin;

  auth.$onAuthStateChanged(function(firebaseUser) {
    console.log('auth state changed');
   if (firebaseUser) {
     console.log('we are still logged in!');
     self.email = true;
     TopicsFactory.checkAdminStatus().then(function(response){
       self.isAdmin = TopicsFactory.isAdmin;
     });
     // go reload idea data....
    //  DataFactory.init();
   } else {
     console.log('logged out -> boooo');
     // redirect
     self.email = '';
     TopicsFactory.checkAdminStatus().then(function(response){
       self.isAdmin = TopicsFactory.isAdmin;
     });
    //  self.logout();
   }
  });

  // //user google login authentication
  // self.login = function() {
  //   //popup google signup
  //   auth.$signInWithPopup("google").then(function(firebaseUser) {
  //     //checks to see if the user is in the database.
  //     DataFactory.checkUserStatus();
  //     if(DataFactory.email.status){
  //       self.email = firebaseUser.email;
  //       //user is in the database. Don't do anything.
  //     } else if (!DataFactory.email.status){
  //       //user is not in the database. Send them to address form.
  //       self.email = ''; //sets button to LOGOUT
  //       loginView();
  //     }
  //   }).catch(function(error) {
  //     console.log("Authentication failed: ", error);
  //   });//end of .catch
  // };//end of self.login()

  //user google login authentication
  self.login = function() {
    //popup google signup
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      //checks to see if the user is in the database.
      DataFactory.checkUserStatus().then(function(response){
        console.log('?', response.data);
        if(response.data == true){
          self.email = true;
          //user is in the database. Don't do anything.
        } else if (response.data == false){
          console.log('EEEY');
          //user is not in the database. Send them to address form.
          loginView();
          self.email = ''; //sets button to LOGOUT
          $scope.$apply();
        }
      })
    }).catch(function(error) {
      console.log("Authentication failed: ", error);

    });//end of .catch
  };//end of self.login()



  //When user hits logout
  self.logout = function() {
    // console.log("logout clicked");
    auth.$signOut().then(function() {
      self.email = '';
      self.isAdmin = '';

      //redirects back to home view
      // logoutView();
    });//end of auth.$signOut()
  };//end of self.deAuthUser()

  //new user object from view button click
  self.addNewUser = function(user) {
    //creating a new variable with input data and firebase data
    var newUser = {
      name : firebaseUser.displayName,
      address : user.street,
      city : user.city,
      state : user.state,
      zipCode :  user.zipCode,
      email : firebaseUser.email,
      photo : firebaseUser.photoURL,
      ward : ""
    }
    //sends object to DB
    DataFactory.addNewUser(newUser);
    //empties inputs after submission
    self.user = {};
    //redirects back to home view after submission
    logoutView();
    self.email = true;
    console.log('kaaay?', self.email);
  }

  //redirect to address form
  function loginView() {
    $location.path('/login');
  }
  //redirect to home
  function logoutView() {
    self.email = firebaseUser.email;
    console.log('athome?', self.email);
    $location.path('/home');
  }
  //redirect to admin view
  function adminView() {
    $location.path('/admin');
  }

}]);//end of app.controller()
