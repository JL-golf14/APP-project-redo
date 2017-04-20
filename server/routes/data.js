
var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');


//gets all users name and id for idea and comment view
router.get('/getUserNameId', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, name FROM users")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets all subtopics for add idea view
router.get('/getSubTopics', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM subtopics")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets ideas for subtopic1 view
router.get('/subtopicIdeas1', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM users FULL OUTER JOIN ideas ON ideas.users_id = users.id WHERE subtopics_id=1;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets ideas for subtopic2 view
router.get('/subtopicIdeas2', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM users FULL OUTER JOIN ideas ON ideas.users_id = users.id WHERE subtopics_id=2;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets ideas for subtopic3 view
router.get('/subtopicIdeas3', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM users FULL OUTER JOIN ideas ON ideas.users_id = users.id WHERE subtopics_id=3;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets ideas for subtopic4 view
router.get('/subtopicIdeas4', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM users FULL OUTER JOIN ideas ON ideas.users_id = users.id WHERE subtopics_id=4;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets ideas for subtopic5 view
router.get('/subtopicIdeas5', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM users FULL OUTER JOIN ideas ON ideas.users_id = users.id WHERE subtopics_id=5;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets all users to compare at login view if in the system
router.get('/getUserMatch', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, email FROM users")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

router.get('/idea', function(req, res) {
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('INSERT INTO ideas_loves (user_id, idea_id) VALUES (9, $1);', [ideaId], function(err, result){
      done();
      if(err){
        ('Error ideas_loves insert', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

//gets all sub-coments for comment view
router.get('/allSubcomments', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query('WITH subcomments_likes_count_temp_table AS (SELECT subcomments.id AS subcomment_id, COUNT(subcomments.id) AS subcomments_likes_count FROM subcomments_likes JOIN subcomments ON subcomments_likes.subcomment_id=subcomments.id GROUP BY subcomments.id)SELECT subcomments.id AS subcomments_primary_id, subcomments.description, subcomments.comment_id AS subcomments_comment_id, subcomments_likes.id AS subcomments_likes_id, subcomments_likes.user_id, subcomments_likes.subcomment_id, subcomments_likes_count FROM subcomments LEFT OUTER JOIN subcomments_likes ON subcomments_likes.id=subcomments.id LEFT JOIN subcomments_likes_count_temp_table ON subcomments_likes_count_temp_table.subcomment_id=subcomments.id;')
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });
});

//gets specific idea by id for comment view
router.get('/getIdeaId', function(req, res) {
  var subtopicIdea = req.headers;
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id=users.id WHERE ideas.id=$1", [subtopicIdea.id])
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets specific comment by id for comment view (subtopic id)
router.get('/getComments', function(req, res) {
  var ideaId = req.headers;
  pool.connect()
    .then(function (client) {
      client.query('WITH comments_likes_count_temp_table AS (SELECT comments.id AS comment_id, COUNT(comments.id) AS comments_likes_count FROM comments_likes JOIN comments ON comments_likes.comment_id=comments.id GROUP BY comments.id) SELECT comments.id AS comments_id, comments.description, comments.idea_id AS comments_idea_id, comments_likes.id AS comments_likes_id, comments_likes.user_id, comments_likes.comment_id, comments_likes_count FROM comments LEFT OUTER JOIN comments_likes ON comments_likes.id=comments.id LEFT JOIN comments_likes_count_temp_table ON comments_likes_count_temp_table.comment_id=comments.id WHERE comments.id=$1;',
      [ideaId.id])
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on get comments', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//adds like to ideas_likes table
router.put('/addIdeaLike/:id', function(req, res){
  var ideaId = req.params.id;
  pool.connect(function (err, client, done) {
    client.query('INSERT INTO ideas_likes (user_id, idea_id) VALUES (9, $1);', [ideaId], function(err, result){
      done();
      if(err){
        ('Error ideas_likes insert', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

//adds love to ideas_love table
router.put('/addIdeaLove/:id', function(req, res){
  var ideaId = req.params.id;
  pool.connect(function (err, client, done) {
    client.query('INSERT INTO ideas_loves (user_id, idea_id) VALUES (9, $1);', [ideaId], function(err, result){
      done();
      if(err){
        ('Error ideas_loves insert', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

//adds like to comments_likes table
router.put('/addCommentLike/:id', function(req, res){
  var commentId = req.params.id;
  pool.connect(function (err, client, done) {
    client.query('INSERT INTO comments_likes (user_id, comment_id) VALUES (1, $1);', [commentId], function(err, result){
      done();
      if(err){
        ('Error on comments_likes insert', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

//adds like to comments_likes table
router.put('/addSubcommentLike/:id', function(req, res){
  var subcommentId = req.params.id;
  pool.connect(function (err, client, done) {
    client.query('INSERT INTO subcomments_likes (user_id, subcomment_id) VALUES (1, $1);', [subcommentId], function(err, result){
      done();
      if(err){
        ('Error on subcomments_likes insert', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
