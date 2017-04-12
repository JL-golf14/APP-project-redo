app.controller('HeaderController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  // var auth = $firebaseAuth();
  // //redirection after login
  // function loginView() {
  //   $location.path('/login');
  // }
  // //redirection after logout
  // function logoutView() {
  //   $location.path('/home');
  // }
  // //redirection to admin view
  // function adminView() {
  //   $location.path('/admin');
  // }
  //
  // //user google login authentication
  // self.login = function() {
  //       console.log("login clicked");
  //   auth.$signInWithPopup("google").then(function(firebaseUser) {
  // //redirects to login view
  //     loginView();
  //       // notyf.confirm('You Are Logged In');
  //       // swal("You Are Logged In", "", "success");
  //       self.photo = firebaseUser.user.photoURL;
  //       self.email = firebaseUser.user.email;
  //         console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
  //         // console.log("Firebase Authenticated as: ", firebaseUser.user.email);
  //   }).catch(function(error) {
  //       console.log("Authentication failed: ", error);
  //   });
  // };//end of self.authUser()
  //
  // //user google logout de-authedicate
  // self.logout = function() {
  //         console.log("logout clicked");
  //   auth.$signOut().then(function() {
  // //redirects back to home view
  //     logoutView();
  //       // swal("You've Logged Out!", "", "success");
  //         console.log('Logging the user out!');
  //   });
  // };//end of self.deAuthUser()
  //
  // //new user object from view button click
  // self.addNewUser = function(user) {
  // //brings in firebase data to function
  //   var firebaseUser = auth.$getAuth();
  // //creating a new variable with input data and firebase data
  //   var newUser = {
  //     name : firebaseUser.displayName,
  //     street : user.street,
  //     city : user.city,
  //     state : user.state,
  //     zipCode : user.zipCode,
  //     country : user.country,
  //     email : firebaseUser.email
  //   }
  //   console.log(newUser);
  //   DataFactory.addNewUser(newUser);
  //   self.user = {};
  // //redirects back to home view after submission
  //   logoutView();
  // }

  

}]);//end of app.connect()
