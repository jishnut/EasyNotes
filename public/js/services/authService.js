angular.module('easyNotes').factory('AuthService', ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

        // create user variable
        var user = null;


        function getUser() {
            return user;
        }

        function isLoggedIn() {
            if (user) {
                return true;
            } else {
                return false;
            }
        }

        function getUserStatus() {
            return $http.get('/auth/user-status')
                // handle success
                .then(function (response) {

                        if (response.status && response.data.status === true) {
                            user = response.data;
                        } else {
                            user = false;
                        }
                    },
                    function (response) {
                        user = false;
                    });
        }

        function login(username, password) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/auth/login', {
                    username: username,
                    password: password
                })
                // handle success
                .then(function (response) {
                        if (response.status === 200) {
                            user = response.data;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    },
                    function (response) {
                        user = false;
                        deferred.reject();
                    });

            // return promise object
            return deferred.promise;

        }

        function logout() {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get('/auth/logout')
                .then(function (data) {
                        user = false;
                        deferred.resolve();
                    },

                    function (data) {
                        user = false;
                        deferred.reject();
                    }
                );

            // return promise object
            return deferred.promise;

        }

        function register(username, password) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/user/register', {
                    username: username,
                    password: password
                })
                // handle success
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }


        // return available functions for use in the controllers
        return ({
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        });

}]);
