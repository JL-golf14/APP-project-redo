app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory',"$routeParams", function($firebaseAuth, $http, $location, DataFactory,$routeParams){


  var self = this;
  var auth = $firebaseAuth();

self.flagCommentClick = function (comments){
  $routeParams.id = comments.id;
  $routeParams.idea_id = comments.idea_id;
  $routeParams.user_id = comments.user_id;
    $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
};//end of flagCommentClick

console.log($routeParams);
self.flagIdeaClick = function (idea){
  console.log('idea',idea);
  console.log("routeParams",$routeParams);
  $routeParams.id = idea.id;
  $routeParams.idea_id = idea.idea_id;
  $routeParams.user_id = idea.user_id;
    $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
};//end of flagCommentClick


//shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;
//add comment to comment to DB
  self.commentRedirect = function() {
//redirect after submission
    $location.url('/comment');
  }//end of self.commentRedirect()

//adds new comment to DB
  self.addComment = function(newComment) {
//sents comment from view to DB
    DataFactory.addComment(newComment);
//empties inputs after submission
    self.newComment = {};
//redirect after submission
    $location.url('/comment');
  }//end of self.addComment()

  self.createIdea = function() {
//redirect after submission
    $location.path('/idea');
  }

  self.showComment = false;

   self.showCommentArea = function(){
     console.log("button clicked");
     self.showComment = true;
   }

}]);//end of app.controller()
