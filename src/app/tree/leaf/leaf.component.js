angular
    .module("Tree")
    .component("treeLeaf", {
        templateUrl: "tree/leaf/leaf.template.tpl.html",
        controller: "LeafController",
        controllerAs: "lefCtrl",
        scope:{},
        bindings: {
            leafData: "="
        }
    });