var app = angular.module('myApp', []);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.patch = {
    'Content-Type' : 'application/json;charset=utf-8'
  }
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('myController', ['$scope','$http', '$filter', '$window', function($scope, $http, $filter, $window) {

    $scope.users = [];
    $scope.title = "";
    $scope.bool = "";
    $scope.id = "";
    $scope.order = "name";
    $scope.searchText = "";
    $scope.isOk == true;

    $scope.user = {
      name: "",
      surnames: "",
      email: "",
      phone: "",
      type_document: "DNI",
      number_document: "",
      address: "",
      created_date: "",
      updated_date: ""
    };
    $scope.form = {
      name: "",
      surnames: "",
      email: "",
      phone: "",
      type_document: "DNI",
      number_document: "",
      address: "",
      created_date: "",
      updated_date: ""
    };

    $scope.selectToast = function() {
      Materialize.toast('Users Ordered by: ' + $scope.order + ' !', 2000, 'rounded');
    }

    $scope.submitForm = function(){
      if($scope.bool == "true"){
        $scope.addNewUser();
      }else {
        $scope.editUserById();
      }
    }

    $scope.sortUsers = function() {
      $scope.users = $filter('orderBy')($scope.users, $scope.order, false);
      $scope.users = $filter('filter')($scope.users, $scope.searchText, false);
    }


    $scope.setForm1 = function(index){
        if ($scope.currentPage > 0) {
          index = index + $scope.itemsPerPage*$scope.currentPage;
        }
        $scope.sortUsers();
        $scope.getUsers();
        $scope.title = "Edit User";
        $scope.id = $scope.users[index]._id;
        $scope.form = $scope.users[index];
        $scope.bool = "false";
    }

    $scope.setForm2 = function(){
      $scope.form = {};
      $scope.user = {};
      $scope.user.type_document = "DNI";
      $scope.title = "Add new User";
      $scope.bool = "true";
    }

    $scope.validateForm = function(){
      if((typeof($scope.user.name) == 'undefined') && (typeof($scope.form.name) == 'undefined') || ($scope.user.name == "") && ($scope.form.name == "")){
        $scope.isOk = false;
        $window.alert("Name Required !");
      } else {
        if((typeof($scope.user.surnames) == 'undefined') && (typeof($scope.form.surnames) == 'undefined') || ($scope.user.surnames == "") && ($scope.form.surnames == "")){
          $scope.isOk = false;
          $window.alert("Surnames Required !");
        } else {
          if((typeof($scope.user.email) == 'undefined') && (typeof($scope.form.email) == 'undefined') || ($scope.user.email == "") && ($scope.form.email == "")){
            $scope.isOk = false;
            $window.alert("Email Required !");
          } else {
            if((typeof($scope.user.type_document) == 'undefined') && (typeof($scope.form.type_document) == 'undefined') || ($scope.user.type_document == "") && ($scope.form.type_document == "")){
              $scope.isOk = false;
              $window.alert("Type of Document Required !");
            } else {
              if((typeof($scope.user.number_document) == 'undefined') && (typeof($scope.form.number_document) == 'undefined') || ($scope.user.number_document == "") && ($scope.form.number_document == "")){
                $scope.isOk = false;
                $window.alert("Document's Number Required !");
              } else {
                $scope.isOk = true;
              }
            }
          }
        }
      }
    }

    $scope.addNewUser = function(){
      $scope.validateForm();
      if ($scope.isOk) {
        $http.post('http://localhost:3000/users', $scope.user)
          .then(function successCallback(response) {
              Materialize.toast('User Added!', 2000, 'rounded');
              $scope.getUsers();
            }, function errorCallback(response) {
              $window.alert("Transmisión incorrecta !");
        });
      }
    }

    $scope.editUserById = function(){
      if ($scope.user.name != "") {
        $scope.form.name = $scope.user.name;
      }
      if ($scope.user.surnames != "") {
        $scope.form.surnames = $scope.user.surnames;
      }
      if ($scope.user.phone != "") {
        $scope.form.phone = $scope.user.phone;
      }
      if ($scope.user.address != "") {
        $scope.form.address = $scope.user.address;
      }
      if ($scope.user.email != "") {
        $scope.form.email = $scope.user.email;
      }
      if ($scope.user.type_document != "") {
        $scope.form.type_document = $scope.user.type_document;
      }
      if ($scope.user.number_document != "") {
        $scope.form.number_document = $scope.user.number_document;
      }
      if ($scope.user.created_date != "") {
        $scope.form.created_date = $scope.user.created_date;
      }
      if ($scope.user.updated_date != "") {
        $scope.form.updated_date = $scope.user.updated_date;
      }

      $scope.validateForm();

      delete $scope.form._id;
      if ($scope.isOk) {
        $http.post('http://localhost:3000/users/' + $scope.id, $scope.form)
          .then(function successCallback(response) {
              Materialize.toast('User Edited!', 2000, 'rounded');
              $scope.getUsers();
            }, function errorCallback(response) {
              $window.alert("Edición incorrecta !");
        });
      }
    }

    $scope.getUsers = function(){
      $http.get('http://localhost:3000/users')
      .then (function(response){
        $scope.users = response.data;
        }
      );
    }

    $scope.deleteUserById = function(index){
      $scope.sortUsers();

      if ($scope.currentPage > 0) {
        index = index + $scope.itemsPerPage*$scope.currentPage;
      }
      if(($scope.users[index+1] == null) && Number.isInteger(index/4)){
        if($scope.currentPage > 0){
          $scope.currentPage = $scope.currentPage - 1;
          $scope.showData();
        }
      }
      var id = $scope.users[index]._id;
      $http.delete('http://localhost:3000/users/' + id)
      .then (function(response){
        $scope.getUsers();
        }
      );
    };

    $scope.showData = function() {

      $scope.getUsers();

      $scope.itemsPerPage = 4;
      $scope.currentPage = 0;

      $scope.range = function() {
        var rangeSize = 4;
        var ps = [];
        var start;

        start = $scope.currentPage;
        if ( start > $scope.pageCount()-rangeSize ) {
          start = $scope.pageCount()-rangeSize+1;
        }

        for (var i=start; i<start+rangeSize; i++) {
          if(i>=0)
             ps.push(i);
        }
        return ps;
      };

      $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };
      $scope.DisablePrevPage = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
      };

      $scope.pageCount = function(){
        return Math.ceil($scope.users.length/$scope.itemsPerPage) - 1;
      };
      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;
        }
      };
      $scope.DisableNextPage = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
      };
      $scope.setPage = function(n) {
        $scope.currentPage = n;
      };
    }
}]);

app.filter('pagination', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
