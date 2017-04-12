app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
// shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;

//add comment to comment to DB
  self.commentRedirect = function() {
    console.log('button click');
//redirect after submission
    $location.url('/comment');
  }
//adds new comment to DB
  self.addComment = function(newComment) {
    console.log(newComment);
//sents comment from view to DB
    DataFactory.addComment(newComment);
//empties inputs after submission    
    self.newComment = {};
//redirect after submission
    $location.url('/home');
  }

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
