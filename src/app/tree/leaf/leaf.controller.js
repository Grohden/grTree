angular.module("Tree").controller("LeafController", [
    '$scope'
  , LeafController
]);

function LeafController($scope) {
  const _self = this;
  _self.leafs = [];

  /**
   * @param {Leaf} leaf - Folha a ser adicionada
   */
  _self.addLeaf = function(leaf){
    _self.leafs.push(leaf);
  };


  /**
   * @type Leaf
   * Model da folha
   */
  function Leaf(title, description){
      this.title = title;
      this.description = description;
  }


}