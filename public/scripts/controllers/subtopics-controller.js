app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth) {
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;
  self.subTopicObject = DataFactory.subTopicObject;
  self.individualSubtopic = TopicsFactory.individualSubTopic;

  thisSubtopic(self.index);

  function thisSubtopic(index){
    TopicsFactory.thisSubtopic(index);
  }

  // self.subtopicIdeas = DataFactory.subtopicIdeas;
  // console.log('index on load: ', self.index);


  getIdeas(self.index);

  function getIdeas(index){
    // console.log('FUNCTIONS', index);
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
  self.addNewIdea = function(subtopicIdea) {
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
  self.moreComments = function(subtopicIdeas) {
    $location.path('/comment/' + subtopicIdea.id);

  }
  var subtopicIdea = $routeParams;
  // DataFactory.getIdeaId(subtopicIdeas);
  self.flagCommentClick = function (subtopicIdeas){
    $routeParams.id = comments.id;
    $routeParams.idea_id = comments.idea_id;
    $routeParams.user_id = comments.user_id;
      $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
  };//end of flagCommentClick


  self.flagIdeaClick = function (subtopicIdeas){
    $routeParams.id = subtopicIdeas.id;
    // $routeParams.idea_id = subtopicIdeas.idea_id;
    $routeParams.user_id = subtopicIdeas.user_id;
      $location.path('flag/'+$routeParams.id+'/'+$routeParams.user_id);
  };//end of flagCommentClick



}]);
