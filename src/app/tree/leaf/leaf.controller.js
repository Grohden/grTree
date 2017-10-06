(function () {
    "use strict";

    angular.module("Tree").controller("LeafController", [
        "$scope",
        "TrunkEvents",
        LeafController
    ]);

    /**
     * @class LeafController
     * @alias leafCtrl
     * @param {{leafData:Leaf, $on: Function}} $scope
     * @param {TrunkEvents} TrunkEvents
     */

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
