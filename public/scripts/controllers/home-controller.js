app.controller('HomeController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location){
//CHRIS’S CODE STARTS HERE

  var self = this;

//redirect to add adea view
self.createIdea = function () {
//redirect after submission  
  $location.url('/idea');
}


//CHRIS’S CODE ENDS HERE
}]);
