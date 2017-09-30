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

}