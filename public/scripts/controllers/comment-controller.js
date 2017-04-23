
app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', '$route', '$window', function($firebaseAuth, $http, $location, DataFactory, $routeParams, $route, $window){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

  //come form DB
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
  self.getCommentIdObject = DataFactory.getCommentIdObject;

  DataFactory.getAllSubcomments();

  //shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;

  //two lines below do data request to DB for specific idea ID
  var subtopicIdea = $routeParams;
  DataFactory.getIdeaId(subtopicIdea);
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

  //*****************************************//
  //            COMMENT CREATION             //
  //*****************************************//
  //adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {

//checks to see if user in logged in
    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }

    var newComment = {
      description : comment.description,
      idea_id : subtopicIdea.id
    }

    //sents comment from view to DB
    DataFactory.addComment(newComment);
//reloads entire page after comment submission
    $window.location.reload();

// empties inputs after submission
    self.comment = {};

  }//end of self.addComment()

  //*****************************************//
  //           SUBCOMMENT CREATION           //
  //*****************************************//
  //shows and hides sun-comment text area
    self.showComment = false;
    self.showCommentArea = function(comments){
      console.log("comments ", comments);
      self.showComment = true;
    }

//button click to add new sub-comment (need to add firebase id into the line below)
    self.addNewSubComment = function(subComment){
      var firebaseUser = auth.$getAuth();
      var userMatchObject = DataFactory.userMatchObject.list;
//container to loop id's through
      var id = "";
//loops through all users email to find correct id
        for (var i = 0; i < userMatchObject.length; i++) {
          if (userMatchObject[i].email == firebaseUser.email) {
            var id = userMatchObject[i].id;
          }//end of if
        };//end of for loop

      var newSubComment = {
          description : subComment.description,
          comment_id : "257",//this is where im stuck
          user_id : id
        }

        DataFactory.addNewSubComment(newSubComment);
//empties sub-comment text area on submit
      self.subComment = {};
        $window.location.reload();
  }//end of addNewSubComment()


}]);//end of app.controller()
