app.controller('Subtopic1Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){
//CHRIS’S CODE STARTS HERE

  var self = this;

//displays specific subtopic ideas to view
  self.subtopicIdeas1 = DataFactory.subtopicIdeas1;

//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked');
//redirect after submission
    $location.path('/comment');
  }

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
