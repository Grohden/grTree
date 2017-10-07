(function () {
    "use strict";

    /**
     * @ngdoc directive
     * @name Tree:treeLeaf
     *
     * @description
     * Tree leafs directive
     *
     * @restrict E
     */
    angular
        .module("Tree")
        .directive("treeLeaf", [
            '$timeout',
            TreeLeaf
        ]);

    function TreeLeaf($timeout) {
        return {
            restrict:"E",
            require: {
                parent: "^^treeTrunk"
            },
            transclude: true,
            templateUrl: "tree/templates/leaf.template.tpl.html",
            controller: "LeafController",
            controllerAs: "leafCtrl",
            bindToController: {
                leafData: "=",
            },
        };
    }
}());
