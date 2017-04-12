var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');
var google = require('googleapis');
var civicInfo = require("civic-info")({apiKey: 'AIzaSyDmMib1-iMC4PwQZcnsKUa4vnB00l0sAfU'});
var user = {};
var voterInfo={};

router.post('/newUser', function (req, res) {
 var newUser = req.body;
 // console.log('newUser: ', newUser.address);

 civicInfo.voterInfo(
   { address: newUser.address}, function callback (error, data) {
newUser.ward = "other";
for (var i = 0; i <= 14; i++) {
  if (typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ] !== 'undefined') {
  newUser.ward = "ward " + (i);
  }
}
console.log(newUser);
 pool.connect()
   .then(function (client) {
     client.query('INSERT INTO users (name, address, email, ward) VALUES ($1, $2, $3, $4)',
       [newUser.name, newUser.address, newUser.email, newUser.ward])
       .then(function (result) {
         client.release();
         res.sendStatus(201);
       })
       .catch(function (err) {
         console.log('error on INSERT', err);
         res.sendStatus(500);
       });
   });//end of .then
});

  });//end of router.post

//adds new idea to DB (need to get query to add id or email)
router.post('/newidea', function (req, res) {
  var newIdea = req.body;
  console.log('newIdea: ', newIdea);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description, subtopics_id) VALUES ($1, $2, $3)',//, $4  , users_email
        [newIdea.title, newIdea.description, newIdea.subtopicId])//, newIdea.email
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
        [newComment.description, newComment.idea_id, newComment.user_id])
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
