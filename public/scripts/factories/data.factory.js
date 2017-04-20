app.factory('DataFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){

  var subTopicObject = { list:[] };
  var subtopicIdeas1 = { list:[] };
  var subtopicIdeas2 = { list:[] };
  var subtopicIdeas3 = { list:[] };
  var subtopicIdeas4 = { list:[] };
  var subtopicIdeas5 = { list:[] };
  var commentsObject = { list:[] };
  var userMatchObject = { list : [] };
  var allSubcommentsObject = { list : [] };
  var getIdeaIdObject = { list : [] };
  var commentInfo = { list : [] };
  var userTally = {};
  var ideasTally = {};
  var commentsTally = {};
  var likesTally = {};

  //calls functions at startup
  init();

  function init() {
    getSubTopics();
    getSubtopicIdeas();
    getUserMatch();
    getTallyInfo();
    getAllSubcomments();
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
        swal("Sorry, we couldn't process your address.", "Try Again!", "error");
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
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds subtopics to idea view select element
  function getSubTopics() {
    $http({
      method: 'GET',
      url: '/public_view/getSubTopics'
    }).then(function(response) {
      subTopicObject.list = response.data;
    });
  }//end of getSubTopics()

  //adds ideas to subtopic views, along with number of likes and number of loves associated with the idea
  function getSubtopicIdeas() {
    $http({
      method: 'GET',
      url: '/public_view/subtopicIdeas1'
    }).then(function(response) {
      subtopicIdeas1.list = response.data;
      console.log(subtopicIdeas1.list);
      for (var i = 0; i < subtopicIdeas1.list.length; i++) {
        if(subtopicIdeas1.list[i].ideas_likes_count == null){
          subtopicIdeas1.list[i].ideas_likes_count = 0;
        }
        if(subtopicIdeas1.list[i].ideas_loves_count == null){
          subtopicIdeas1.list[i].ideas_loves_count = 0;
        }
      }
    });
    $http({
      method: 'GET',
      url: '/public_view/subtopicIdeas2'
    }).then(function(response) {
      subtopicIdeas2.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/public_view/subtopicIdeas3'
    }).then(function(response) {
      subtopicIdeas3.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/public_view/subtopicIdeas4'
    }).then(function(response) {
      subtopicIdeas4.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/public_view/subtopicIdeas5'
    }).then(function(response) {
      subtopicIdeas5.list = response.data;
    });
  }//end of getSubTopicIdeas()


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
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of getSubTopicIdeas

  //adds comment to the database
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


  //get users to pull id when an idea is Submitted
  function getUserMatch() {
    $http({
      method: 'GET',
      url: '/public_view/getUserMatch'
    }).then(function(response) {
      userMatchObject.list = response.data;
    });
  }//end of getAllUsers()

  //function to display tallies on home page
  function getTallyInfo() {
    $http({
      method: 'GET',
      url: '/public_view/userTally'
    }).then(function(response){
      userTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public_view/ideasTally'
    }).then(function(response){
      ideasTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public_view/commentsTally'
    }).then(function(response){
      commentsTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public_view/likesTally'
    }).then(function(response){
      likesTally.count = response.data;
    });
  } // end of getTallyInfo function

  //adds subcomment to database
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

  //gets comments to display on comments page
  function getComments(ideaId) {
    $http({
      method: 'GET',
      url: '/data/getComments',
      headers: ideaId
    }).then(function(response) {
      commentInfo.list = response.data;
      console.log(commentInfo.list);
      for (var i = 0; i < commentInfo.list.length; i++) {
        if(commentInfo.list[i].comments_likes_count == null){
          commentInfo.list[i].comments_likes_count = 0;
        }
      }

    });
  }

  //gets all subcomments for comments view
  function getAllSubcomments() {
    $http({
      method: 'GET',
      url: '/data/allSubcomments'
    }).then(function(response) {
      allSubcommentsObject.list = response.data;
      for (var i = 0; i < allSubcommentsObject.list.length; i++) {
        if(allSubcommentsObject.list[i].subcomments_likes_count == null){
          allSubcommentsObject.list[i].subcomments_likes_count = 0;
        }
      }
    });
  }

  //gets all subcomments for comments view
  function getIdeaId(ideaId) {
    $http({
      method: 'GET',
      url: '/data/getIdeaId',
      headers: ideaId
    }).then(function(response) {
      getIdeaIdObject.list = response.data;
    });
  }

  //function to add idea "like" to database
  function addIdeaLike(ideaId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/data/addIdeaLike/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getSubtopicIdeas();
      });
    });
  }

  //function to add idea "love" to database
  function addIdeaLove(ideaId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/data/addIdeaLove/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getSubtopicIdeas();
      });
    });
  }

  //function to add comment "like" to database
  function addCommentLike(commentId, ideaId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/data/addCommentLike/' + commentId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getComments({id: ideaId});
      });
    });
  }

  //function to add comment "like" to database
  function addSubcommentLike(subcommentId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/data/addSubcommentLike/' + subcommentId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getAllSubcomments();
      });
    });
  }

  return {
    userTally: userTally,
    ideasTally: ideasTally,
    commentsTally: commentsTally,
    likesTally: likesTally,
    addIdeaLike: addIdeaLike,
    addIdeaLove: addIdeaLove,
    addNewUser : addNewUser,
    addNewIdea : addNewIdea,
    subTopicObject : subTopicObject,
    subtopicIdeas1 : subtopicIdeas1,
    subtopicIdeas2 : subtopicIdeas2,
    subtopicIdeas3 : subtopicIdeas3,
    subtopicIdeas4 : subtopicIdeas4,
    subtopicIdeas5 : subtopicIdeas5,
    addComment : addComment,
    getUserMatch : getUserMatch,
    userMatchObject : userMatchObject,
    addNewSubComment : addNewSubComment,
    allSubcommentsObject : allSubcommentsObject,
    getIdeaId : getIdeaId,
    getIdeaIdObject : getIdeaIdObject,
    commentInfo : commentInfo,
    addCommentLike: addCommentLike,
    getComments: getComments,
    addSubcommentLike: addSubcommentLike
  }

}]); // end of app.factory
