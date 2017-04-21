
app.controller('HomeController', ['DataFactory', 'TopicsFactory', '$firebaseAuth', '$http', '$location', function(DataFactory, TopicsFactory, $firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();


  self.mainTopic = TopicsFactory.mainTopic;
  self.subTopic = TopicsFactory.subTopic;

  self.userTally = DataFactory.userTally;
  self.ideasTally = DataFactory.ideasTally;
  self.commentsTally = DataFactory.commentsTally;
  self.likesTally = DataFactory.likesTally;



  self.redirectLogin = function () {
    $location.url('/login');
  }

  self.redirectIdea = function () {
    $location.url('/idea');
  }

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


// console.log("userMatchObject ",userMatchObject);
  self.addNewIdea = function(idea) {
    var userMatchObject = DataFactory.userMatchObject.list;
    console.log(userMatchObject);
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
      console.log('new idea?: ', newIdea);
    //sents object to factory
      DataFactory.addNewIdea(newIdea);
    //empties inputs on submit
      self.idea = {};
    //redirect to correct subtopic page after submit
    //not working :(
      // subView(idea.subtopicId);
    }//end of self.createIdea()

}]);//end of app.controller()
