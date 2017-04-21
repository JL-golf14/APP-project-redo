app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', function($firebaseAuth, $http, $location, DataFactory, $routeParams){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  self.objectId = $routeParams;


  //START OF KRIS'S UPDATED CODE -- COMMENTS AND SUBCOMMENTS LIKES

  DataFactory.getComments(self.objectId);

  self.commentInfo = DataFactory.commentInfo;

  self.addCommentLike = DataFactory.addCommentLike;

  self.addSubcommentLike = DataFactory.addSubcommentLike;

  //END OF KRIS'S UPDATED CODE

  self.allSubcommentsObject = DataFactory.allSubcommentsObject;

  //shows all comments from BD to view(migth not need the two lines below)
  self.commentsObject = DataFactory.commentsObject;
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;

  DataFactory.getIdeaId(self.objectId);


  // console.log('subtopicIdeas:',self.subtopicIdeas);
  //add comment to comment to DB
  self.commentRedirect = function() {
    //redirect after submission
    $location.url('/home');
  }//end of self.commentRedirect()


  //adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {
    var newComment = {
      description : comment.description,
      idea_id : subtopicIdea.id,
      // user_id : need to put the firebase id in here when that works
    }

    //sents comment from view to DB
    DataFactory.addComment(newComment);
    //empties inputs after submission
    self.newComment = {};
    //redirect after submission
    $location.url('/comment/');
  }//end of self.addComment()

  self.createIdea = function() {
    //redirect after submission
    $location.path('/idea');
  }

  //shows and hides sun-comment text area
  self.showComment = false;
  //sub-comment button click function
  self.showCommentArea = function(){
    self.showComment = true;
  }

  //button click to add new sub-comment (need to add firebase id into the line below)
  self.addNewSubComment = function(subComment){
    //empties sub-comment text area on submit
    var newSubComment = {
      description : subComment.description,
      comment_id : "12"
      // user_id : need to put the firebase id in here when that works
    }
    DataFactory.addNewSubComment(newSubComment);
    self.subComment = {};
  }//end of addNewSubComment()

}]);//end of app.controller()
