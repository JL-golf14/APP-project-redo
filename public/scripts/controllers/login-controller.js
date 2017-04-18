app.controller('LoginController', ['DataFactory', '$firebaseAuth', '$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){
  //CHRIS’S CODE STARTS HERE

  //google authenticate bellow
  var auth = $firebaseAuth();
  var self = this;

  //object to verify if user exsists in DB (need to finish)
  var userMatchObject = DataFactory.userMatchObject.list;

  self.message= "hey there"
  //notyf must have
  // var notyf = new Notyf();

  //redirection after login
  function loginView() {
    $location.path('/login');
  }
  //redirection after logout
  function logoutView() {
    $location.path('/home');
  }
  //redirection to admin view
  function adminView() {
    $location.path('/admin');
  }
  var firebaseUser = auth.$getAuth();
  //user google login authentication
  self.login = function() {
    //call function at factory to get existing user id and email
    DataFactory.getUserMatch();
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      // //redirects to login view
      // loginView();
      //adds user google photo to view
      self.photo = firebaseUser.user.photoURL;
      //adds user google email to view
      self.email = firebaseUser.user.email;
      //object contains all users
      var userMatchObject = DataFactory.userMatchObject.list;
      //checks DB for exsisting users and then desides redirect
      for (var i = 0; i <userMatchObject.length; i++) {
        if (userMatchObject[i].email == firebaseUser.user.email) {
          logoutView();
        } else {
          loginView();
        }
      };//end of for loop
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });//end of .catch
  };//end of self.login()
  //user google logout de-authedicate
  self.logout = function() {
    // console.log("logout clicked");
    auth.$signOut().then(function() {
      //redirects back to home view
      logoutView();
    });//end of auth.$signOut()
  };//end of self.deAuthUser()

  //new user object from view button click
  self.addNewUser = function(user) {
    //brings in firebase data to function
    var firebaseUser = auth.$getAuth();

    //creating a new variable with input data and firebase data

    var newUser = {
      name : firebaseUser.displayName,
      address : user.street + " " + user.city + ", " + user.state + " " + user.zipCode,
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
  }

  //CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
