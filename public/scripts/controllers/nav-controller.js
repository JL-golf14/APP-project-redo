
app.controller('NavCtrl', ['$firebaseAuth', '$http', '$location', 'TopicsFactory', function($firebaseAuth, $http, $location, TopicsFactory){

  var self = this;

  self.subTopic = TopicsFactory.subTopic;

  this.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

}]);
