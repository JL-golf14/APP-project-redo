
app.controller('HomeController', ['DataFactory', 'TopicsFactory', '$firebaseAuth', '$http', '$location', function(DataFactory, TopicsFactory, $firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var notyf = new Notyf();

  //populates the main topic area
  self.mainTopic = TopicsFactory.mainTopic;
  //populates select option with subtopics
  self.subTopic = TopicsFactory.subTopic;
  //populates tally fields
  self.userTally = DataFactory.userTally;
  self.ideasTally = DataFactory.ideasTally;
  self.commentsTally = DataFactory.commentsTally;
  self.likesTally = DataFactory.likesTally;

  self.addIdeaLike = DataFactory.addIdeaLike;
  self.addIdeaLove = DataFactory.addIdeaLove;
  self.mostLikedIdea = DataFactory.mostLikedIdea;

  TopicsFactory.findActiveTopic();
  DataFactory.getMostLikedIdea();

  <!--
  /* ============================================================================= *
  *               ADD NEW IDEA                                                     *
  * ============================================================================= */
  -->
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    var notyf = new Notyf();

    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }
    //name and email is added to the idea object
    if(idea.subtopicId) {

      var newIdea = {
        name : firebaseUser.displayName,
        email : firebaseUser.email,
        subtopicId : idea.subtopicId,
        title : idea.title,
        description : idea.description
      }
      //sents the idea object to factory
      DataFactory.addNewIdea(newIdea)
      //redirects the user to the subtopic they chose from the dropdown
      redirectToSubtopic(newIdea);
      //empties inputs on submit
      self.idea = {};
    } else {
      notyf.alert('Please select a subtopic from the dropdown.');
    }
  }//end of self.createIdea()

  function getIdeas(index){
    DataFactory.getSubtopicIdeas(index);
  }
  <!--
  /* ============================================================================= *
  *                  REDIRECTS                                                     *
  * ============================================================================= */
  -->
  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    DataFactory.getSubtopicIdeas(self.index);
  }

  function homeView() {
    $location.path('/home');
  }//end of homeView()

  self.redirectLogin = function () {
    $location.url('/login');
  }//end of redirectLogin()

  //redirect to add idea view
  self.createIdea = function() {
    //redirect after submission
    $location.url('/idea');
  }//end of self.createIdea

}]);//end of app.controller()
