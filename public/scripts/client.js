var app = angular.module('ConnectApp', ['ngRoute','firebase']);

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
  .when('/comment', {
    templateUrl: 'views/comments.html',
    controller: 'CommentController',
    controllerAs: 'cc'
  })
  .when('/subtopic1', {
    templateUrl: 'views/subtopics/subtopic1.html',
    controller: 'Subtopic1Controller',
    controllerAs: 'st1c'
  })
  .when('/subtopic2', {
    templateUrl: 'views/subtopics/subtopic2.html',
    controller: 'Subtopic2Controller',
    controllerAs: 'st2c'
  })
  .when('/subtopic3', {
    templateUrl: 'views/subtopics/subtopic3.html',
    controller: 'Subtopic3Controller',
    controllerAs: 'st3c'
  })
  .when('/subtopic4', {
    templateUrl: 'views/subtopics/subtopic4.html',
    controller: 'Subtopic4Controller',
    controllerAs: 'st4c'
  })
  .when('/subtopic5', {
    templateUrl: 'views/subtopics/subtopic5.html',
    controller: 'Subtopic5Controller',
    controllerAs: 'st5c'
  })
  .when('/views/:id', {
    templateUrl: 'views/comment.html',
    controller: 'CommentController',
    controllerAs: 'cc'
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
