(function () {

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.msg = "";

    $scope.msgDisplayed = function() {
      var lunchItems;
      
      if ($scope.input) {
        $scope.input = $scope.input.trim();
        lunchItems = $scope.input.split(",");
        lunchItems = lunchItems.filter(function(lunchItem) {
          return lunchItem.length > 0;
        });

        if (lunchItems.length > 3) {
          $scope.msg = "Too Much!";
        } else {
          $scope.msg = "Enjoy!";
        }
      } else {
        $scope.msg = "Please enter data first";
      }
    }
  }

})();
