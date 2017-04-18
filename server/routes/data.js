var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');

//gets total number of likes on app to display on home page
router.put('/addLike/:id', function(req, res){
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

module.exports = router;
