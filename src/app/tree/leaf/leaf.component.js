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
      trunk: "="
    }
  });