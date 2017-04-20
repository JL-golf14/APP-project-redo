
app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', function($firebaseAuth, $http, $location, DataFactory, $routeParams){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();


//shows all comments from BD to view(migth not need the two lines below)
  self.commentsObject = DataFactory.commentsObject;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;

//come form DB
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
  self.getCommentIdObject = DataFactory.getCommentIdObject;

//two lines below do data request to DB for specific idea ID
  var subtopicIdea = $routeParams;
  DataFactory.getIdeaId(subtopicIdea);

//add comment to comment to DB
  self.commentRedirect = function() {
//redirect after submission
    $location.url('/home');
  }//end of self.commentRedirect()


//adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {
    var newComment = {
            description : comment.description,
            // idea_id : subtopicIdea.id,
            idea_id : $routeParams
            // user_id : need to put the firebase id in here when that works
          }
console.log(newComment);
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
    console.log("button clicked");
    self.showComment = true;
  }

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




}]);//end of app.controller()
