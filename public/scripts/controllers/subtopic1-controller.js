app.controller('Subtopic1Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var self = this;

  self.addIdeaLike = DataFactory.addIdeaLike;

  self.addIdeaLove = DataFactory.addIdeaLove;

//populates select options
  self.subTopicObject = DataFactory.subTopicObject;

//displays specific subtopic ideas to view
  self.subtopicIdeas1 = DataFactory.subtopicIdeas1;

//redirect to home view
  function homeView() {
    $location.path('/home');
  }//end of homeView()
//redirect to add idea view
  self.createIdea = function() {
//redirect after submission
    $location.path('/idea');
  }

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
  }//end of self.createIdea()

}]);//end of app.controller()
