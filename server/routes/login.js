
var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
var google = require('googleapis');
var civicInfo = require("civic-info")({apiKey: 'AIzaSyDmMib1-iMC4PwQZcnsKUa4vnB00l0sAfU'});

var voterInfo={};
var user = {};

//*****************************************//
//           PREVIOUS USER LGOIN           //
//*****************************************//

//Finds the id of the current user based on the token from firebase.
router.get('/getUserMatch', function (req, res) {
  console.log('get user match route');
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, email FROM users WHERE id = $1", [req.decodedToken.userSQLId])
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
//              NEW USER LOGIN             //
//*****************************************//

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
  }//end of if
}//end of for loop
 pool.connect()
   .then(function (client) {
     client.query('INSERT INTO users (name, address, city, state, zipcode, email, photo, ward) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
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


// router.post('/newUser', function (req, res) {
//  var newUser = req.body;
//  // console.log('newUser: ', newUser.address);
//  civicInfo.voterInfo(
//    { address: newUser.address}, function callback (error, data) {
//      //  console.log("error", error);
//      //  console.log("++++++++++++++++++data",data);
//      newUser.ward = "other";
//      for (var i = 0; i <= 14; i++) {
//        // console.log(typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ]);
//        if (typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ] !== 'undefined') {
//          newUser.ward = "ward " + (i);
//        }
//      }
//      console.log(newUser);
//      pool.connect()
//      .then(function (client) {
//        client.query('INSERT INTO users (name, address, email, ward, photo) VALUES ($1, $2, $3, $4, $5)',
//        [newUser.name, newUser.address, newUser.email, newUser.ward, newUser.photo])
//        .then(function (result) {
//          client.release();
//          res.sendStatus(201);
//        })
//        .catch(function (err) {
//          console.log('error on INSERT', err);
//          res.sendStatus(500);
//        });
//      });//end of .then
//    });//end of router.post
// });


//req.decodedToken.userSQLId
module.exports = router;
