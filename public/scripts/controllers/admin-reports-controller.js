
app.controller('AdminReportsController', ['$firebaseAuth','$http','$location', 'DataFactory', 'TopicsFactory', function ($firebaseAuth, $http, $location, DataFactory, TopicsFactory){
  var self = this;
  var auth = $firebaseAuth();
  var ctx = document.getElementById("myChart");
  var wardChart = [];
  var countChart = [];
  var allUsers = {list:[]};
var subtopic =[];
var countIdeaChart = [];
var ideaChart = [];

//calls function at factory when controller is active
  TopicsFactory.findActiveSubTopics();
// populates subtopic select dropdown on admin reports view(dynamically changes when topic change)
  self.subTopic = TopicsFactory.subTopic;
//object from db based on filterUsers
  self.dbFilterObject = DataFactory.dbFilterObject;


//sends filter results to factory
self.getFilteredResult = function(filterObject){
  // console.log('filterObject' , filterObject);
  DataFactory.getFilteredResult(filterObject);
}




  auth.$onAuthStateChanged(function(firebaseUser) {
   if (firebaseUser) {
     console.log('we are still logged in!');
     self.email = firebaseUser.email;
     // go reload idea data....
     getUserChart();
   } else {
     console.log('boooo');
     // redirect
     self.email = '';
    //  self.logout();
   }
  });


  function getUserChart() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'GET',
      url: '/admin/userChart',
      headers: {
        id_token: idToken
      }
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var ward = 'Ward ' + response.data[i].ward;
        wardChart.push(ward);
        countChart.push(response.data[i].count)
      }

      var data = {
        datasets: [{
          data:countChart
          // [11,16,7,3,14,17,2,11,17,9,2,1,7,8]
          ,
          backgroundColor: [
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
            "#36A2EB",
          ],
          label: 'Total Users' // for legend
        }],
        labels: wardChart
      }

      new Chart(ctx, {
        data: data,
        type: "bar",
        options: {
          // legend:{
          //   labels: generateLabels:{ function(data)
          // }},

          // },
          defaultFontSize:90,
          display: true,
          defaultFontSize: 44,
          fontSize:44,
          title: {
            display: true,
            fontSize:44,
            // text: 'Wards Chart'
          },

          elements: {
            arc: {
              borderColor: "#000000"
            }
          }
        }
      });
    });
  });
  }
}

// function centuryFromYear(year) {
//
//  return Math.ceil(year / 100);
//
// };
//
// console.log(centuryFromYear(1801));
//

// function adjacentElementsProduct(inputArray) {
//   var arr1=[];
//   for (var i = 0; i <=inputArray.length; i++) {
//   if(inputArray[i] !== unique)
// console.log(arr1,"ddd");
//     if(arr1.length== 2){
//     console.log(arr1,"arr1");
//     var index = i;
//   }
//   else{index=0}
// }
// var max = Math.max.apply(null,inputArray);
// var second = inputArray.sort(function(a,b){return b-a})[1];
// console.log(index,max,second);
// return (max*index);
// }


  // var updateOccurrence = function(hash, value) {
  //   // probably quicker to cache, but would be inconsistent
  //   if (hash[value] === undefined) {
  //     hash[value] = 1;
  //   } else {
  //     hash[value]++;
  //   }
  //
  //   return hash[value];
  // };
  //
  // var hash = {};
  // var greatestOccurrence = 0;
  // var mode = undefined; // done to be explicit
  // for (var i = 0; i < inputArray.length; i++) {
  //   var value = inputArray[i];
  //   var occurrence = updateOccurrence(hash, value);
  //   if (greatestOccurrence < occurrence) {
  //     greatestOccurrence = occurrence;
  //     mode = value;
  //   }
  // }

//
// var max =Math.max.apply(null,inputArray);
// var adjSpot = inputArray.indexOf(max);
// if (inputArray[adjSpot-1]>inputArray[adjSpot+1]){
//   return max*inputArray[adjSpot-1];
// }else {
//   return max*inputArray[adjSpot+1];
// // var second = inputArray.sort(function(a,b){return b-a})[0];
// // console.log(max,mode);
// // return (max*mode);
// }
// }
// function adjacentElementsProduct(inputArray) {
// var sum = 0;
//    for (var i = 0,a=1; i <= inputArray.length-1,a <=inputArray.length-2; i++,a++) {
// if (inputArray[i]*inputArray[a]> sum){
//   sum = inputArray[i]*inputArray[a];
// }
// }
//
//   return sum;
// }
//
// console.log(adjacentElementsProduct([1,4,6,-3,5,4]));
// function checkPalindrome(inputString){
//    for (var i = 0,a=inputString.length-1; i < inputString.length-1,a > 0; i++,a--) {
// if (inputString.charAt(a) === inputString.charAt(i)) {
// } else {return false;
//       }
//     }
//   return true;
// }


}]);//end of app.controller
