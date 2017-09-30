angular.module("Tree").controller("LeafController", [
  '$scope',
  'Leaf',
  LeafController
]);

function LeafController($scope, Leaf) {
  const _self = this;
  const data = _self.leafData;

  _self.isInEditMode = true;
  _self.leafs = [];

  _self.addLeaf = function (label, description){
    _self.leafs.push(new Leaf(label, description));
  };

  _self.saveLeaf = function (label, description) {
    data.setLabel(label)
        .setDescription(description);
  };

  _self.requestLeafModel = function () {

  };

}