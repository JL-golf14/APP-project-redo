<<<<<<< HEAD
app.controller('IdeaController', ['DataFactory', '$routeParams', '$http', function(DataFactory, $routeParams, $http) {
  var self = this;
  // var auth = $firebaseAuth();
  //
  //
  // auth.$onAuthStateChanged(getUser);
  //
  // //populates user profile information on page load
  // function getUser(){
  //   var firebaseUser = auth.$getAuth();
  //   if(firebaseUser) {
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/data/user',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         self.userProfile = response.data;
  //         console.log(self.userProfile);
  //
  //       })
  //     })
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // };
  //
  //
  // function getIdea(){
  //   var firebaseUser = auth.$getAuth();
  //   if(firebaseUser) {
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/data/idea',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         self.idea = response.data;
  //       })
  //     })
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // };
=======
app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
>>>>>>> feature-add/edit-idea

//current subtopics for select option
  self.subTopicObject = DataFactory.subTopicObject;

//redirect to home view
  function homeView() {
    $location.path('/home');
  }

//function adds new idea to DB
  self.addNewIdea = function(idea) {
    var firebaseUser = auth.$getAuth();
//name and email is added to object
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description
    }
//sents object to factory
    DataFactory.addNewIdea(newIdea);
//empties inputs on submit
    self.idea = {};
//redirect after submit
    homeView();

  };//end of addNewIdea()

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
