/**
 * @ngdoc component
 * @name treeLeaf
 * @module Tree
 *
 * @description
 * Main tree component, it has the search and buttons, and inside, the leafs
 *
 */

angular
  .module("Tree")
  .component("treeLeaf", {
    require: {
      parent: "^^treeTrunk"
    },
    transclude: true,
    templateUrl: "tree/leaf/leaf.template.tpl.html",
    controller: "LeafController",
    controllerAs: "leafCtrl",
    scope: {},
    bindings: {
      leafData: "=",
    }
  });