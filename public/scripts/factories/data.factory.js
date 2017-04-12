
app.factory('DataFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){
  //containers
  var subTopicObject = { list:[] };
  var subtopicIdeas1 = { list:[] };
  var subtopicIdeas2 = { list:[] };
  var subtopicIdeas3 = { list:[] };
  var subtopicIdeas4 = { list:[] };
  var subtopicIdeas5 = { list:[] };
  var commentsObject = { list:[] };
  var allUsers = {list: []};

  init();

  //startup functions
  function init() {
    getUsers();
  }

  //function to display user list on manage users admin view
  function getUsers(){
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
    })
  }

  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init();
      });
    })
  }


//add new user to DB from login view button click
function addNewUser(newUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/newUser',
      data: newUser,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("User Added To Database", "", "success");
      self.newUser = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//add new idea to DB from button click from idea view
function addNewIdea(newIdea){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/newIdea',
      data: newIdea,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      getSubtopicIdeas();
      swal("Idea Added To Database", "", "success");
      self.newIdea = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds subtopics1 to idea view select element
function getSubTopics() {
    $http({
      method: 'GET',
      url: '/data/getSubTopics'
    }).then(function(response) {
      subTopicObject.list = response.data;
    });
}//end of getSubTopics()


//adds ideas to subtopic views
function getSubtopicIdeas() {
    $http({
      method: 'GET',
      url: '/data/subtopicIdeas1'
    }).then(function(response) {
      subtopicIdeas1.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas2'
    }).then(function(response) {
      subtopicIdeas2.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas3'
    }).then(function(response) {
      subtopicIdeas3.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas4'
    }).then(function(response) {
      subtopicIdeas4.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas5'
    }).then(function(response) {
      subtopicIdeas5.list = response.data;
    });
}//end of getSubTopicIdeas()

//adds liked/idea to DB
function addLiked(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addLiked',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("Liked Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds loved/idea to DB
function addLoved(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addLoved',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("Loved Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds flag/idea to DB
function addFlag(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addFlag',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("flag Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//gets all comments for comment view
function getComments() {
    $http({
      method: 'GET',
      url: '/data/comments'
    }).then(function(response) {
      commentsObject.list = response.data;
    });
}//end of getComments()

//adds loved/idea to DB
function addComment(newComment){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addComment',
      data: newComment,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      getComments();
      swal("Loved Added To Database", "", "success");
      self.addComment = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addComment()




  return {
//new user object from add address button click
    addNewUser : addNewUser,
//new idea object from idea button click
    addNewIdea : addNewIdea,
//sends current subtopics to add idea view option element
    subTopicObject : subTopicObject,
//adds ideas to subtopic1 view
    subtopicIdeas1 : subtopicIdeas1,
//adds ideas to subtopic2 view
    subtopicIdeas2 : subtopicIdeas2,
//adds ideas to subtopic3 view
    subtopicIdeas3 : subtopicIdeas3,
//adds ideas to subtopic4 view
    subtopicIdeas4 : subtopicIdeas4,
//adds ideas to subtopic5 view
    subtopicIdeas5 : subtopicIdeas5,
//adds liked to comment at DB
    addLiked : addLiked,
//adds loved to comment at DB
    addLoved : addLoved,
//adds flag to comment at DB
    addFlag : addFlag,
//adds comment to DB
    addComment : addComment,
//gets comments to comment view
    commentsObject : commentsObject,

    allUsers: allUsers,

    deactivateUser: deactivateUser
  }

}]); // end of app.factory
