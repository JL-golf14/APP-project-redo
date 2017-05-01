app.controller('AdminFlaggedController', ['$firebaseAuth','$http', '$location',"$routeParams",'AdminFactory', function($firebaseAuth, $http, $location,$routeParams,AdminFactory){
  var self = this;
  var auth = $firebaseAuth();

  //run an Admin/check
  //if admin do nothing
  //if not admin -> redirect to 403 page

  auth.$onAuthStateChanged(function(firebaseUser) {
    console.log('auth state changed');
    if (firebaseUser) {
      AdminFactory.getAllFlaggedComments();
      self.commentToFlagObject = AdminFactory.commentToFlagObject;
      AdminFactory.getAllFlaggedIdeas();
      self.ideaToFlagObject = AdminFactory.ideaToFlagObject;
    } else {

    }
  });

  self.deleteFlaggedComment = function(flags) {
    AdminFactory.deleteFlaggedComment(flags);
  };

  self.deleteFlaggedIdeaFlag = function(flags) {
    console.log(flags);
    AdminFactory.deleteFlaggedIdeaFlag(flags);
  };

  self.updateFlaggedIdea = function(flags) {
    AdminFactory.updateFlaggedIdea(flags);
  };
  self.updateFlaggedComment = function(flags) {
    AdminFactory.updateFlaggedComment (flags);
  };

  self.deleteIdea = function(flag){
    AdminFactory.deleteIdea(flag);
  }
  self.deleteComment= function(flag){
    AdminFactory.deleteComment(flag);
  }

  self.resolveFlag = false;

  self.resolveFlags = function(){
    console.log('getsome');
    self.resolveFlag = true;
  }

}]);
