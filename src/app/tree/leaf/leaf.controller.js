angular.module("Tree").controller("LeafController", [
  '$scope',
  LeafController
]);

function LeafController($scope) {
  const _self = this;
  _self.leafs = [];

  /**
   * @param {Leaf} leaf - Folha a ser adicionada
   */
  _self.addLeaf = function(){
    _self.leafs.push({label:"sample", description:"sample"});
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