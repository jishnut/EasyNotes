angular.module('easyNotes').controller('mainCtrl',['$scope','AuthService','$http',function($scope,AuthService,$http){
    $scope.authService = AuthService;
    //$scope.notes=[{title:'note1',content:'cont1'},{title:'note2',content:'cont2'}];
    $http.get('/notes')
                .then(function (response) {
                        $scope.notes = response.data;
                        $scope.currentNote = $scope.notes[0];
                    },

                    function (response) {
                        $scope.notes = [];
                    }
                );

    $scope.setCurrentNote = function(note){
        $scope.currentNote = note;
         $(this).addClass('selected') // add class to clicked element
        .siblings() // get siblings
        .removeClass('selected'); 
    };
}]);