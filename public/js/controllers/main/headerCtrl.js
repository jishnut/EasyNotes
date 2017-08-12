angular.module('easyNotes').controller('headerCtrl',['$scope','AuthService','$location',function($scope,AuthService,$location){
  
    $scope.authService = AuthService;
    
    $scope.logout = function () {

      // initial values

      // call login from service
      AuthService.logout()
        // handle success
        .then(function () {
          $location.path('/login');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
        });

    };
}]);