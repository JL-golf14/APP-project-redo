app.controller('AdminReportsController', ['$firebaseAuth','$http','$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var ctx = document.getElementById("myChart");
  // var ctx = "myChart";

  //

  // charts();
  // function charts(){
  //   new Chart(ctx, {
  //     data: data,
  //     type: 'pie',
  //     options: {
  //       display: true,
  //       defaultFontSize: 42,
  //       title: {
  //           display: true,
  //           text: 'Wards Chart'
  //       }
  //     }
  //   });
  // };
  var data = {
    datasets: [{
      data: [
        11,16,7,3,14,17,2,11,17,9,2,1,7,8
      ],
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
      label: 'My dataset' // for legend
    }],
    labels: [
      "ward 1","ward 2","ward 3","ward 4","ward 5","ward 6","ward 7","ward 8","ward 9","ward 10",
      "ward 11","ward 12","ward 13","other"
    ]
  }
  getUsers();
  function getUsers(){
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
    })
  }
  new Chart(ctx, {
    data: data,
    type: "polarArea",
    options: {
        // legend:{
        //   labels: generateLabels:{ function(data)
        // }},

      // },
        display: true,
        defaultFontSize: 22,
        fontSize:22,
        title: {
            display: true,
            fontSize:22,
            text: 'Wards Chart'
        },


      elements: {
        arc: {
          borderColor: "#000000"
        }
      }
    }
  });





}]);
