var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');
var google = require('googleapis');
var civicInfo = require("civic-info")({apiKey: 'AIzaSyDmMib1-iMC4PwQZcnsKUa4vnB00l0sAfU'});
var user = {};
var voterInfo={};


//adds new idea to DB
router.post('/newidea', function (req, res) {
  var newIdea = req.body;
  console.log('newIdea: ', newIdea);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description, subtopics_id, users_id) VALUES ($1, $2, $3, $4)',
        [newIdea.title, newIdea.description, newIdea.subtopicId, req.decodedToken.userSQLId])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds comments to DB
router.post('/addComment', function (req, res) {
  var newComment = req.body;
  console.log('newComment: ', newComment);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO comments (description, idea_id, user_id) VALUES ($1, $2, $3)',
        [newComment.description, newComment.idea_id, req.decodedToken.userSQLId])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
  });//end of router.post

router.post('/newUser', function (req, res) {
 var newUser = req.body;
 console.log('newUser: ', newUser);
 civicInfo.voterInfo(
   { address: newUser.address}, function callback (error, data) {
    //  console.log("error", error);
    //  console.log("++++++++++++++++++data",data);
newUser.ward = "other";
for (var i = 0; i <= 14; i++) {
  // console.log(typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ]);
  if (typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ] !== 'undefined') {
  newUser.ward = "ward " + (i);
  }
}
    newUser.ward = "ward " + (i);
  }//end of if
}//end of for loop
 pool.connect()
   .then(function (client) {
     client.query('INSERT INTO users (name, address, city, state, zipCode, email, photo, ward) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
       [newUser.name, newUser.address, newUser.city, newUser.state, newUser.zipCode, newUser.email, newUser.photo, newUser.ward])
       .then(function (result) {
         client.release();
         res.sendStatus(201);
       })
       .catch(function (err) {
         console.log('error on INSERT', err);
         res.sendStatus(500);
       });
    });//end of .then
  });//end of civicinfo
});//end of router.post

//adds new sub-comment to DB
router.post('/addNewSubcomment', function (req, res) {
  var newSubComment = req.body;
  var token = req.params; //this is were im stuck!!
  console.log('token: ', token);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO subcomments (description) VALUES ($1)',
        [newSubComment.description])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

module.exports = router;
