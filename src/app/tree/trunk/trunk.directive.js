(function () {
    angular
        .module("Tree")
        .directive("treeTrunk", function () {
            return {
                controller: "TrunkController",
                controllerAs: "trkCtrl",
                replace: false
            };
        });
}());
