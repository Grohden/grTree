(function () {

    /**
     * @ngdoc directive
     * @name Tree:treeTrunk
     *
     * @description
     * Base tree directive, provides controller for other child
     * directives
     *
     * @restrict E
     */
    angular
        .module("Tree")
        .directive("treeTrunk", function () {
            return {
                restrict:"E",
                controller: "TrunkController",
                controllerAs: "trkCtrl",
                replace: false
            };
        });
}());
