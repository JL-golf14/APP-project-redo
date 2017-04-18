app.controller('FlagController', ['$firebaseAuth', '$http', '$location', 'DataFactory',"$routeParams", function($firebaseAuth, $http, $location, DataFactory,$routeParams){

  var self = this;
  self.flagToObject = $routeParams;
  var flagObject = $routeParams;
  self.commentsToFlagObject = {list:[]};


  self.getCommentsToFlag = function() {
    $http({
      method: 'GET',
      url: '/data/toFlagComments',
      headers:flagObject
    }).then(function(response) {
      self.commentsToFlagObject.list = response.data;
      console.log('this worked');
      console.log("in the get flag return",self.commentsToFlagObject.list);
    });
  }//end of getComments()
  self.getCommentsToFlag();


  self.flagClick = function(){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/data/flagReport',
        header: {
          id_token: idToken
                },
          data:
          flagObject
        }).then(function(response){
          swal({
          title: '<i>Your Input has been sent to our Administration for review</i>',
          type: 'info',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
          cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>'
        });
        }).catch(function(error) {
          swal("Sorry, we couldn't process your request.", "Try Again!", "error");
          console.log('error authenticating', error);
        });
      });
    }//end of firebase.auth()
    //end of flagClick

  }]);
