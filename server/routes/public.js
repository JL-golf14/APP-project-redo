var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//*****************************************//
//               MAIN TOPIC                //
//*****************************************//

router.get('/findActiveTopic', function(req, res){
  var title = req.headers.title
  var description = req.headers.description;
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error finding main topic from the database.', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//**********************************************//
//           DISPLAY ACTIVE SUBTOPICS           //
//**********************************************//
router.get('/findActiveSubTopics', function(req, res){
  pool.connect( function (err, client, done) {
    //First find the active Topic, then find all subTopics that are a part of this main topic.
    //This acts as one extra layer of security, I could consider removing it.
    client.query('SELECT id FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error finding an active Main Topic for Subtopic Query', err);
        res.sendStatus(500);
      } else {
        if (result.rows != undefined){
          activeMainTopicID = result.rows[0].id;
          pool.connect(function(err, client, done){
            //Limit Query to 5 as an extra layer of security to ensure the site styling doesn't break.
            client.query('SELECT * FROM subtopics WHERE main_id = $1 AND active = true ORDER BY id ASC LIMIT 5;',
            [activeMainTopicID], function(err, result){
              done();
              if(err){
                console.log('Error finding all active subtopics', err);
                res.sendStatus(500);
              } else {
                res.send(result.rows);
              }
            });//ends client.query
          });//ends pool.connect
        } else{
          console.log('THERE IS NO CURRENT THINGY');
        }
      }
    });
  });
});

router.get('/findSpecificSubTopic/', function(req, res){
  console.log('where is the id? :', req.headers);
  var subtopicId = 1;
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM subtopics WHERE id = $1;',
    [subtopicId],function(err, result){
      done();
      if(err){
        console.log('Error finding main topic from the database.', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//**********************************************//
//                                              //
//               HOME PAGE TALLIES              //
//                                              //
//**********************************************//
//*****************************************//
//             FIND USERS TOTAL            //
//*****************************************//
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
//*****************************************//
//             FIND IDEAS TOTAL            //
//*****************************************//
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
//*****************************************//
//           FIND COMMENTS TOTAL           //
//*****************************************//
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
        console.log(result.rows[0]);
      }
    });
  });
});
//*****************************************//
//             FIND LIKES TOTAL            //
//*****************************************//
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
        console.log(result.rows[0]);
      }
    });
  });
});



//**********************************************//
//                                              //
//          IDEA/COMMENT/SUBTOPIC VIEWS         //
//                                              //
//**********************************************//
//*****************************************//
//     ADDS SUBTOPICS TO ADD IDEA FORM     //
//*****************************************//
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
//*****************************************//
//       ADDS COMMENTS TO IDEA VIEW        //
//*****************************************//
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
          console.log('error on SELECT all comments', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get
//*****************************************//
//       ADDS IDEAS TO SUBTOPIC VIEW       //
//*****************************************//
//Finds all ideas based on the $routeParams/subtopic id and adds them to the subtopic views
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

module.exports = router;
