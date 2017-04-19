var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');

//adds like to ideas_likes table
router.put('/addIdeaLike/:id', function(req, res){
  console.log('add like route hit');
  var ideaId = req.params.id;
  console.log(ideaId);
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
  console.log('add idea love route hit');
  var ideaId = req.params.id;
  console.log(ideaId);
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

module.exports = router;
