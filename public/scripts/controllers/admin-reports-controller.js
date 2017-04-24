
app.controller('AdminReportsController', ['$firebaseAuth','$http','$location', 'DataFactory', function ($firebaseAuth, $http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();
  var ctx = document.getElementById("myChart");
  var wardChart = [];
  var countChart = [];
  var allUsers = {list:[]};

//populates subtopic select dropdown on admin reports view
  self.subTopicObject = DataFactory.subTopicObject;

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
          label: 'My dataset' // for legend
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
  }//end of getAllUsers()

}]);
