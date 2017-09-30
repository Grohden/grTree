angular.module("Tree").controller("LeafController", [
  '$scope',
  'Leaf',
  LeafController
]);

function LeafController($scope, Leaf) {
  const _self = this;

  _self.isInEditMode = true;
  _self.editData = {};
  _self.leafs = [];

  _self.addLeaf = function (label, description) {
    _self.leafs.push(new Leaf(label, description));
  };

  _self.saveLeaf = function (label, description) {
    _self.leafData.setLabel(label);
    _self.leafData.setDescription(description || "");
    _self.isInEditMode = false;
  };
}