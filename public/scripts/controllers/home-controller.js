app.controller('HomeController', ['DataFactory', '$firebaseAuth', '$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var self = this;

  self.redirectLogin = function () {
    $location.url('/login');
  }

  self.redirectIdea = function () {
    $location.url('/idea');
  }

  self.userTally=DataFactory.userTally;

  self.ideasTally=DataFactory.ideasTally;

  self.commentsTally=DataFactory.commentsTally;

  self.likesTally=DataFactory.likesTally;

  //redirect to home view
  function homeView() {
    $location.path('/home');
  }//end of homeView()

  //populates select option with subtopics
  self.subTopicObject = DataFactory.subTopicObject;
  //redirect to add idea view
  self.createIdea = function() {
    //redirect after submission
    $location.url('/idea');
  }//end of self.createIdea

  var userMatchObject = DataFactory.userMatchObject.list;
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    //container to loop id's through
    var id = "";
    //loops through all users email to find correct id
    for (var i = 0; i < userMatchObject.length; i++) {
      if (userMatchObject[i].email == firebaseUser.email) {
        var id = userMatchObject[i].id;
      }//end of if
    };//end of for loop
    //name and email is added to object
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description,
      id : id
    }
    //sents object to factory
    DataFactory.addNewIdea(newIdea);
    //empties inputs on submit
    self.idea = {};
    //redirect after submit
    homeView();
  }//end of self.addNewIdea()

}]);//end of app.controller()
