var express = require('express');
var router = express.Router();
var pg = require('pg');


//gets all users name and id for idea and comment view
router.get('/getUserNameId', function (req, res) {
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
router.get('/getSubTopics', function (req, res) {
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
router.get('/subtopicIdeas1', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.users_id = users.id WHERE subtopics_id=1")
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
router.get('/subtopicIdeas2', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.users_id = users.id WHERE subtopics_id=2")
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
router.get('/subtopicIdeas3', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.users_id = users.id WHERE subtopics_id=3")
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
router.get('/subtopicIdeas4', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.users_id = users.id WHERE subtopics_id=4")
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
router.get('/subtopicIdeas5', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.users_id = users.id WHERE subtopics_id=5")
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
router.get('/getUserMatch', function (req, res) {
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
router.get('/allComments', function (req, res) {
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

router.get('/idea', function(req, res){
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

router.get('/userTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT COUNT (*) FROM users;', function(err, result){
      done();
      if(err){
        ('Error completing user tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

router.get('/ideasTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT COUNT (*) FROM ideas;', function(err, result){
      done();
      if(err){
        ('Error completing ideas tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

router.get('/commentsTally', function(req, res){
  console.log('commments tally route hit');
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM comments) + (SELECT COUNT(*) FROM subcomments) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing comments tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

router.get('/likesTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM sublikes) + (SELECT COUNT(*) FROM ideas_likes) + (SELECT COUNT(*) FROM comments_likes) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing likes tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

module.exports = router;
