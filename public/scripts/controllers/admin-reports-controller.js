app.controller('AdminReportsController', ['$firebaseAuth','$http','$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var ctx = document.getElementById("myChart");
  var wardChart = [];
  var countChart = [];
  var allUsers = {list:[]};


  getUserChart();
  function getUserChart() {
    $http({
      method: 'GET',
      url: '/data/userChart'
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log(countChart);
        wardChart.push(response.data[i].ward);
        countChart.push(response.data[i].count)
      }
      var data = {
        datasets: [{
          data:countChart
          // [11,16,7,3,14,17,2,11,17,9,2,1,7,8]
          ,
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "rgb(74, 236, 110)",
            "rgb(237, 60, 65)",
            "rgb(121, 22, 113)",
            "rgb(01, 12, 153)",
            "rgb(221, 22, 13)",
            "rgb(101, 312, 53)",
            "rgb(221, 133, 133)",
            "rgb(77, 12, 153)",
          ],
          label: 'Users in Ward' // for legend
        }],
        labels: wardChart
      }

      new Chart(ctx, {
        data: data,
        type: "bar",
        options: {
          scale:{
          beginAtZero:true},
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
            text: 'Wards Chart'
          },

          elements: {
            arc: {
              borderColor: "#000000"
            }
          }
        }
      });


    });
  }//end of getAllUsers()


  getIdeaChart();
  function getIdeaChart() {
    $http({
      method: 'GET',
      url: '/data/ideaChart'
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        WardChart.push(response.data[i].ward);
        countChart.push(response.data[i].count)
      }

});
};

}]);
