angular.module("Tree").controller("TrunkController", [
  TrunkController
]);

function TrunkController() {
  const _self = this;
  _self.currentSearch = "";
  _self.leafs = [];
  

  _self.addLeaf = function(){
    _self.leafs.push({title:"sample", description:"sample"});
  };

  _self.removeLeaf = function(){

  };

}