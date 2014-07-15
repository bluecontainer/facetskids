angular.module('facetsKids.planSelector', [])


.controller('PlanSelectorController', ['$scope', 'planSelectorInitializer', function($scope, initializer) {
    console.log($scope);

    $scope.planSelection.donation_amt = 0;

    $scope.plans = initializer;
    clearSelect();
    if ($scope.planSelection.planName) {
      selectPlanName($scope.planSelection.planName)
    }
    else {
      selectPlan($scope.plans[0])
    }

    offerCount = $scope.plans.length;
    colSize = 12/offerCount;
    colOffset = 12 - (colSize*2);
    $scope.colClass = "col-md-" + colSize;

    $scope.select = function (){
      clearSelect();

      //set selected to true
      selectPlan(this.p)
    }

    function clearSelect() {
      //make everything false
      this.plans.forEach(function(elem) {
        elem.state = false;
        elem.btn_label = "Get";
      })
    }

    function selectPlan(plan) {
      if (plan == null) return;

      plan.state = true;
      plan.btn_label = "Selected";
      $scope.planSelection.planName = plan.plan_name;

      if ($scope.planSelection.planName == "yellow+donation") {
        $scope.planSelection.donation_amt = 10;
      }
      else {
        $scope.planSelection.donation_amt = 0;
      }
    }

    function selectPlanName(name) {
      var selectedPlan;
      this.plans.forEach(function(elem) {
        if (elem.plan_name == name) {
          selectedPlan = elem;
        }
      })
      selectPlan(selectedPlan);
    }

  }])

.directive('planSelector', function() {
  return {
    restrict: 'EA',
    //scope: {
    //  value: '='
    //},
    //transclude: true,
    //scope: {},
    controller: 'PlanSelectorController',
    template: ' \
      <div> \
      <div class="row"> \
        <div class="{{colClass}} text-center" ng-repeat="p in plans"> \
          <h3>{{p.price_label}}</h3> \
          {{p.type_label}}<br/> \
        </div> \
      </div> \
      <div class="row"> \
        <div class="{{colClass}} text-center" ng-repeat="p in plans"> \
          <div class="btn btn-large btn-primary" ng-click="select()">{{p.btn_label}}</div> \
          <br/><br/> \
        </div> \
      </div> \
      </div>',
    replace: true
  };
});