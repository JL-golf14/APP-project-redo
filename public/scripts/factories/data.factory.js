
app.factory('DataFactory', ['$http', '$firebaseAuth', '$routeParams', function($http, $firebaseAuth, $routeParams){

  var auth = $firebaseAuth();


  var subTopicObject = { list : [] };
  var subtopicIdeas = { list : [] };
  var commentsObject = { list : [] };
  var userMatchObject = { list : [] };
  var allSubcommentsObject = { list : [] }
  var getIdeaIdObject = { list : [] }
  var getCommentIdObject = { list : [] }
  var allUsers = { list : [] }
  var userTally = {};
  var ideasTally = {};
  var commentsTally = {};
  var likesTally = {};
  var likes = {};
console.log(subTopicObject);


  //calls functions at startup
  init();

  function init() {
    getSubTopics();
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
        init()
      });
    })
    getSubtopicIdeas();
    getComments();
    getUserMatch();
    getTallyInfo();
    getLikes();
  }


  //add new user to DB from login view button click
  function addNewUser(newUser){
    // firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/newUser',
        data: newUser
        // headers: {
          // id_token: idToken
        // }
      }).then(function(response){
        // notyf.confirm('Blank Submitted For Approval');
        swal("User Added To Database", "", "success");
        self.newUser = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your address.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    // });//end of firebase.auth()
  }//end of addNewUser()

  //add new idea to DB from button click from idea view
  function addNewIdea(newIdea){
    return firebase.auth().currentUser.getToken().then(function(idToken) {
      return $http({
        method: 'POST',
        url: '/login/newIdea',
        data: newIdea,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // getSubtopicIdeas();
        swal("Idea Added To Database", "", "success");
        self.newIdea = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds subtopics to idea view select element
  function getSubTopics() {
    $http({
      method: 'GET',
      url: '/public/getSubTopics',
    }).then(function(response) {
      subTopicObject.list = response.data;
    });
  }//end of getSubTopics()

  //adds ideas to subtopic views
  function getSubtopicIdeas(id) {
    $http({
      method: 'GET',
      url: '/public/subtopicIdeas',
      headers: {
        id : id
      }
    }).then(function(response) {
      subtopicIdeas.list = response.data;
    });
  }//end of getSubTopicIdeas()

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
        // self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
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
        // self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of getSubTopicIdeas


  //gets all comments for comment view
  function getComments() {
    $http({
      method: 'GET',
      url: '/public/allComments'
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
        swal("Comment Added To Database", "", "success");
        self.addComment = {};
      }).catch(function(error) {
        swal("Values Are Incorrect", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addComment()

getUserMatch()
  function getUserMatch() {
    $http({
      method: 'GET',
      url: '/data/getUserMatch',
    }).then(function(response) {
      userMatchObject.list = response.data;
      // console.log('getusermatch response: ', response);
    }).catch(function(error) {
      console.log('error on get user match', error);
      return 403;
    });
  }//end of getAllUsers()

  getTallyInfo();

  //function to display tallies on home page
  function getTallyInfo() {
    // console.log('inside of get tally?');
    $http({
      method: 'GET',
      url: '/public/userTally'
    }).then(function(response){
      userTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/ideasTally'
    }).then(function(response){
      ideasTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/commentsTally'
    }).then(function(response){
      commentsTally.count = response.data;
    });
  };//end of firebase.auth()


//get users to pull id when an idea is Submitted
// function getUserMatch() {
//     $http({
//       method: 'GET',
//       url: '/public/likesTally'
//     }).then(function(response){
//       likesTally.count = response.data;
//     });
//   } // end of getTallyInfo function


  // function getLikes() {
  //   $http({
  //     method: 'GET',
  //     url: '/data/getLikes'
  //   }).then(function(response) {
  //     likes.count = response.data;
  //     console.log(likes.count);
  //   });
  // }

  //adds like to DB
  function addLike(ideaId){
    // console.log(ideaId);
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/data/addLike/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // console.log(response);
      }).catch(function(error) {
        console.log('error adding like to database', error);
      });
    });
  }

//adds loved/idea to DB
function addNewSubComment(newSubComment){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addNewSubComment',
      data: newSubComment,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      getAllSubcomments();
      swal("Comment Added To Database", "", "success");
      self.newSubComment = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addComment()

//gets all subcomments for comments view
function getAllSubcomments() {
    $http({
      method: 'GET',
      url: '/data/allSubcomments'
    }).then(function(response) {
      allSubcommentsObject.list = response.data;
    });
}//end of getAllUsers()

//gets all subcomments for comments view
function getIdeaId(subtopicIdea) {
    $http({
      method: 'GET',
      url: '/data/getIdeaId',
      headers: subtopicIdea
    }).then(function(response) {
      getIdeaIdObject.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/getCommentId',
      headers: subtopicIdea
    }).then(function(response) {
      getCommentIdObject.list = response.data;
    });

}//end of getAllUsers()



  return {
    userTally: userTally,
    ideasTally: ideasTally,
    commentsTally: commentsTally,
    likesTally: likesTally,
    likes: likes,
    addLike: addLike,
//new user object from add address button click
    addNewUser : addNewUser,
//new idea object from idea button click
    addNewIdea : addNewIdea,
//sends current subtopics to add idea view option element
    subTopicObject : subTopicObject,
//adds ideas to subtopic1 view
    subtopicIdeas : subtopicIdeas,
//adds comment to DB
    addComment : addComment,
//gets comments to comment view
    commentsObject : commentsObject,
    // allUsers: allUsers,
    deactivateUser: deactivateUser,
//checks user for axisting account at login
    getUserMatch : getUserMatch,
//all existing users object
    userMatchObject : userMatchObject,
//adds sub-comments to DB
    addNewSubComment : addNewSubComment,
//adds sub-comments to view
    allSubcommentsObject : allSubcommentsObject,
//gets specific idea id from DB
    getIdeaId : getIdeaId,
    getSubtopicIdeas : getSubtopicIdeas,
//specifid idea from DB for comment view
    getIdeaIdObject : getIdeaIdObject,
//specified comments from DB for comment view
    getCommentIdObject : getCommentIdObject

  }

}]); // end of app.factory
