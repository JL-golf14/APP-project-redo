var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');

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
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id, users.name, users.email, users.address, users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count FROM ideas LEFT OUTER JOIN users ON ideas.user_id=users.id LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id WHERE ideas.id=1;')
      // [ideaId]
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
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE subtopics_id=2")
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
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE subtopics_id=3")
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
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE subtopics_id=4")
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
      client.query("SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE subtopics_id=5")
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


// gets total number of app users to display on home page
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

//gets total number of ideas shared on app to display on home page
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

//gets total number of comments shared on app to display on home page
router.get('/commentsTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM comments) + (SELECT COUNT(*) FROM subcomments) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing comments tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

//gets total number of likes on app to display on home page
router.get('/likesTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM sublikes) + (SELECT COUNT(*) FROM ideas_likes) + (SELECT COUNT(*) FROM comments_likes) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing likes tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});


//gets all users name and id for idea and comment view
router.get('/userChart', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
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

//gets all users name and id for idea and comment view
router.get('/ideaChart', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
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

module.exports = router;
