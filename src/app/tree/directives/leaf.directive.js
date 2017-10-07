(function () {
    "use strict";

    /**
     * @ngdoc directive
     * @name treeLeaf
     * @module Tree
     *
     * @description
     * Main tree component, it has the search and buttons, and inside, the leafs
     *
     */
    angular
        .module("Tree")
        .directive("treeLeaf", function () {
            return {
                require: {
                    parent: "^^treeTrunk"
                },
                transclude: true,
                templateUrl: "tree/templates/leaf.template.tpl.html",
                controller: "LeafController",
                controllerAs: "leafCtrl",
                bindToController: {
                    leafData: "=",
                }
            };
        });
}());
