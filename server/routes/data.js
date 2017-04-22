
var pool = require('../modules/database-config');
var express = require('express');
var router = express.Router();
// var pool = require('../modules/database-config');
var pg = require('pg');
// var connectionString = require('../modules/database-config');
var config = {
  database: 'psp_database',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//end of config

//pool / pg constructor function
var pool = new pg.Pool(config);

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

router.get('/comments', function(req, res){
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM comments JOIN idea ON idea.id=comments.idea_id WHERE email=$1;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get comments on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets all coments for comment view
router.get('/allComments', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM comments")
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
    client.query('SELECT * FROM idea;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get causes on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//gets all sub-coments for comment view
router.get('/allSubcomments', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM subcomments")
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

//gets specific idea by id for comment view
router.get('/getIdeaId', function(req, res) {
  var subtopicIdea = req.headers;
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE ideas.id=$1", [subtopicIdea.id])
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
router.get('/getCommentId', function(req, res) {
  var subtopicIdea = req.headers;
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM comments WHERE idea_id=$1", [subtopicIdea.id])
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

//adds like to ideas_likes table
router.put('/addIdeaLike/:id', function(req, res){
  console.log('add idea like route hit');
  // var ideaId = req.params.id;
    // var userId = req.decodedToken.userSQLId;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM ideas_likes WHERE user_id=4;', function(err, result){
      done();
      if(err){
        ('Error on ideas_likes user check query', err);
      } else {
        if (result.rows.length == 0){
          pool.connect(function (err, client, done) {
            client.query('INSERT INTO ideas_likes (user_id, idea_id) VALUES (4, 1);', function(err, result){
              done();
              if(err){
                ('Error ideas_likes insert', err);
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
              }
            });
          });
        }else{
          res.sendStatus(403);
        }
      }
    });
  });
});

module.exports = router;
