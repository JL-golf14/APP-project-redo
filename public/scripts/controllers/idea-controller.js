app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location','$routeParams', '$http', function(DataFactory, $firebaseAuth, $location,$routeParams, $http) {
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

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
