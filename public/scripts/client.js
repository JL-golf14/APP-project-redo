
var app = angular.module('ConnectApp', ['ngRoute','firebase', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'hc'
  })
  .when('/header', {
    templateUrl: 'views/header.html',
    controller: 'HeaderController',
    controllerAs: 'hrc'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'lc'
  })
  .when('/idea/:id?/:idea_id?/:user_id?', {
  templateUrl: 'views/idea.html',
  controller: 'IdeaController',
  controllerAs: 'ic'
})
.when('/flag/?:id?/:idea_id?/:user_id?', {
  templateUrl: 'views/flag.html',
  controller: 'FlagController',
  controllerAs: 'fc'
})
  .when('/comment/?:id?/:idea_id?/:user_id?', {
    templateUrl: 'views/comments.html',
    controller: 'CommentController',
    controllerAs: 'cc'
  })
  .when('/subtopics/:id', {
    templateUrl: 'views/subtopics.html',
    controller: 'SubtopicsController',
    controllerAs: 'stc'
  })
  .when('/admin-manage-users', {
    templateUrl: 'views/admin-views/admin-manage-users.html',
    controller: 'AdminManageUsersController',
    controllerAs: 'amuc'
  })
  .when('/admin-flags', {
    templateUrl: 'views/admin-views/admin-flags.html',
    controller: 'AdminFlaggedController',
    controllerAs: 'afc'
  })
  .when('/admin-reports', {
    templateUrl: 'views/admin-views/admin-reports.html',
    controller: 'AdminReportsController',
    controllerAs: 'arc'
  })
  .when('/admin-topics', {
    templateUrl: 'views/admin-views/admin-topics.html',
    controller: 'AdminTopicsController',
    controllerAs: 'atc'
  })
  .otherwise({
    redirectTo: 'home'
  })

}]);
