(function () {
    "use strict";
    /**
     * @ngdoc controller
     * @name Tree:LeafController
     *
     * @description
     * Main controller used by tree directive and other
     * directives
     *
     * @requires $scope
     * @requires TrunkEvents
     **/
    angular
        .module("Tree")
        .controller("LeafController", [
            "$scope",
            "TrunkEvents",
            LeafController
        ]);

    function LeafController($scope, TrunkEvents) {

        const _self = this;

        //Scope things
        $scope.$on(TrunkEvents.CLOSE_ALL_LEAFS, function () {
            const leaf = _self.leafData;
            leaf.expanded = false;
        });

        $scope.$on(TrunkEvents.OPEN_ALL_LEAFS, function () {
            const leaf = _self.leafData;
            leaf.expanded = true;
        });

    }
}());
