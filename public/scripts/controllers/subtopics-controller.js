
app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', '$window', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth, $window) {
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;
  self.subTopicObject = DataFactory.subTopicObject;
  self.individualSubtopic = TopicsFactory.individualSubTopic;

  self.addIdeaLike = function(ideaId,subTopicId){
    // if (firebaseUser === null){
    //   swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    // }
    DataFactory.addIdeaLike(ideaId,subTopicId);
  }

  self.addIdeaLove = function(ideaId,subTopicId){
    // if (firebaseUser === null){
    //   swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    // }
    DataFactory.addIdeaLove(ideaId,subTopicId);
  }

  //displays subtopic main heading?
  thisSubtopic(self.index);

  function thisSubtopic(index){
    TopicsFactory.thisSubtopic(index);
  }

  getIdeas(self.index);

  function getIdeas(index){
    DataFactory.getSubtopicIdeas(index);
  }

  //redirect to home view
  function homeView() {
    $location.path('/home');
  }
  //redirect to correct subtopic view
  //not working :(
  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    getIdeas(self.index);
  }

  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

  //redirect to add idea view
  self.flagIdea = function() {
    $location.path('/flag');
  }

  // //get moreComments button click
  // self.moreComments = function() {
  //   $location.path('/comment/');
  // }

  // var userMatchObject = DataFactory.userMatchObject.list;
  // console.log('userMatchObject.list: ', userMatchObject);
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    //checks to see if user in logged in
    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }
    //The new idea object with the user inforamtion attached.
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description
    }
    //Sends the new idea object to factory
    DataFactory.addNewIdea(newIdea).then(function(response){
      // redirect to correct subtopic page after submit
      redirectToSubtopic(newIdea);
    });
    //reloads the entire page after submitting an idea
    $window.location.reload();
    //loads ideas
    getIdeas(newIdea.id);
    //empties inputs on submit
    self.idea = {};
  }//end of self.createIdea()

//get moreComments button click
self.moreComments = function(subtopicIdea) {
  $location.path('/comment/' + subtopicIdea.idea_id);
  console.log(subtopicIdea);
}
  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
  //redirect to add idea view
  self.flagIdea = function() {
    $location.path('/flag');
  }

  //redirect to home view
  function homeView() {
    $location.path('/home');
  }
  //redirect to correct subtopic view
  //not working :(
  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    getIdeas(self.index);
  }


}]);//end of my.app
