// Code goes here

(function() {

  var app = angular.module("gitHubViewer", []);

  var mainctrl = function($scope,$http,$interval,$log,$anchorScroll,$location) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url).then(onRepos,onError);
    };
    
    var onRepos = function(response)
    {
      console.log(response.data);
      $scope.repos = response.data;
      $location.hash("userDetail");
      $anchorScroll();
    }
    
    var onError = function(reason) {
      $scope.error = "Not able to fetch error.";
    };

    $scope.GetDetail = function(username) {
      $log.info("searching for "+ username);
      $http.get("https://api.github.com/users/"+username).then(onUserComplete, onError);     
    };

    var onAllUsersComplete = function (response) {
        $scope.users = response.data;      
    };
    
    $scope.searchALL = function () {

        $http.get("https://api.github.com/users").then(onAllUsersComplete, onError);        
    };

    $scope.message = "Hello Welcome to GIt Hub Users View Applications";
    $scope.sortOrder = '-stargazers_count';    
    $scope.username = "angular";
    $scope.searchALL();
  };

  app.controller("mainctrl", mainctrl);


}());