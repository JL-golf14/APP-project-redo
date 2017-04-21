app.controller('AdminFlaggedController', ['$firebaseAuth','$http', '$location',"$routeParams",'AdminFactory', function($firebaseAuth, $http, $location,$routeParams,AdminFactory){
  var self = this;
  var auth = $firebaseAuth();
self.ideaToFlagObject = {list:[] };
self.allUsers = AdminFactory.allUsers;

self.deleteFlaggedItem = function(flags) {
  console.log(flags);
  AdminFactory.deleteFlaggedItem(flags);
};

self.updateFlaggedItem = function(flags) {
  console.log(flags);
  AdminFactory.updateFlaggedItem (flags);
};


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

self.getAllFlaggedItems = function() {
  $http({
    method: 'GET',
    url: '/admin/allFlags',
    // headers:flagObject
  }).then(function(response) {
    self.ideaToFlagObject.list = response.data;
  });
}//end of getComments()
// self.getIdeaToFlag();
self.getAllFlaggedItems();

}]);
