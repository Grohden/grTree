(function () {

    /**
     * @ngdoc Directive
     * @name treeTrunk
     * */
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
