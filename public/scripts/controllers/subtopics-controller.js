app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth) {
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;
  //not sure
  self.subTopicObject = DataFactory.subTopicObject;
  // self.subtopicIdeas = DataFactory.subtopicIdeas;
  console.log('index on load: ', self.index);

  self.ideaPressedLike = false;
  self.ideaPressedLove = false;

  self.addIdeaLike = function(arg1){
  self.ideaPressedLike = true;
  DataFactory.addIdeaLike(arg1);
}

self.addIdeaLove = function(arg1){
  self.ideaPressedLove = true;
  DataFactory.addIdeaLove(arg1);
}

  getIdeas(self.index);

  function getIdeas(index){
    console.log('FUNCTIONS', index);
    DataFactory.getSubtopicIdeas(index);
  }

  //redirect to home view
  function homeView() {
    $location.path('/home');
  }
  //redirect to correct subtopic view
  //not working :(
  function redirectToSubtopic(url) {
    $location.path('/subtopics/' + url);
    getIdeas(self.index);

    // getIdeas(url);
    console.log('index in redirect: ', self.index);
    console.log('url in redirect: ', url);
  }
  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
  //get moreComments button click
  self.moreComments = function() {
    $location.path('/comment/');
  }

  var userMatchObject = DataFactory.userMatchObject.list;
// console.log('userMatchObject.list: ', userMatchObject);
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();

    // container to loop id's through
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
      DataFactory.addNewIdea(newIdea).then(function(response){
        redirectToSubtopic(newIdea);
      });
      // redirect to correct subtopic page after submit
      // getIdeas(newIdea.id);

    //empties inputs on submit
      self.idea = {};
    }//end of self.createIdea()

    // get moreComments button click
        self.moreComments = function(subtopicIdea) {
        $location.path('/comment/' + subtopicIdea.id);
        }

}]);
