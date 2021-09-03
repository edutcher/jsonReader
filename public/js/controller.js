angular
  .module("Challenge", [])
  .controller("ChallengeController", ChallengeCtrl);

ChallengeCtrl.$inject = ["$http", "$scope"];

function ChallengeCtrl($http, $scope) {
  var cCtrl = this;

  $scope.orders = [];
  $scope.tracking = "";

  $scope.getTrackingInfo = ($event) => {
    const id = $event.target.id;
    const chosenTracking = $scope.orders.filter((order) => order._id === id);
    $scope.tracking = chosenTracking[0].tracking_number;
    $scope.link = chosenTracking[0].tracking_url;
    let today = new Date();
    $scope.delivery = new Date(today);
    $scope.shipDate = chosenTracking[0].ship_date;
    $scope.shipMethod = chosenTracking[0].shipping_method;
    switch (chosenTracking[0].shipping_method) {
      case "2Day": {
        $scope.delivery.setDate(today.getDate() + 2);
        break;
      }
      case "Grnd": {
        $scope.delivery.setDate(today.getDate() + 6);
        break;
      }
    }
  };

  const getOrders = async () => {
    axios.get("/orders").then((res) => {
      $scope.orders = res.data;
      $scope.$digest();
      return res.data;
    });
  };
  getOrders();
  console.log("Controller loaded!");
  cCtrl.welcomeMessage = "Order Tracking";
  return cCtrl;
}
