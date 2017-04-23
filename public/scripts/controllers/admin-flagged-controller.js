app.controller('AdminFlaggedController', ['$firebaseAuth','$http', '$location',"$routeParams",'AdminFactory', function($firebaseAuth, $http, $location,$routeParams,AdminFactory){
  var self = this;
  var auth = $firebaseAuth();
self.ideaToFlagObject = AdminFactory.ideaToFlagObject;
self.allUsers = AdminFactory.allUsers;

self.deleteFlaggedItem = function(flags) {

  AdminFactory.deleteFlaggedItem(flags);
};

self.deleteItem = function(flags) {
console.log("this is the flag on delete item",flags);
  AdminFactory.deleteItem(flags);
};



self.updateFlaggedItem = function(flags) {
  console.log(flags);
  AdminFactory.updateFlaggedItem (flags);
};
self.getAllFlaggedItems = function(){
  AdminFactory.getAllFlaggedItems();
}
self.getAllFlaggedItems();


self.flagCommentClick = function (comments){
  console.log("falg comment clicked",comments);
  $routeParams.id = comments.id;
  $routeParams.idea_id = comments.idea_id;
  $routeParams.user_id = comments.user_id;
    $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
};//end of flagCommentClick

self.flagIdeaClick = function (idea){
  console.log('idea',idea);
  console.log("routeParams",$routeParams);
  $routeParams.id = idea.id;
  $routeParams.idea_id = idea.idea_id;
  $routeParams.user_id = idea.user_id;
    $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
};//end of flagCommentClick



}]);
