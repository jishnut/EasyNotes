var app = angular.module('easyNotes', ['ngRoute']).
  config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {
          templateUrl: '/partials/index.html',
          controller:'mainCtrl',
          access: {restricted: true}
        })
        .when('/sign-up', {
          templateUrl: '/partials/sign-up.html',
          controller:'mainCtrl',
          access: {restricted: false}
        })
        .when('/login', {
          templateUrl: '/partials/login.html',
          controller:'loginCtrl',
          access: {restricted: false}
        })
        .otherwise({ redirectTo: '/' });
    }
  ]
);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});