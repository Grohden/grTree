angular.module("Tree").controller("TrunkController", [
  "$scope",
  "$parse",
  "Leaf",
  TrunkController
]);


/**
 *
 * @class TrunkController
 * @constructor
 * @param {Object} $scope
 * @param {Function} $parse
 * @param {Leaf} Leaf
 * @alias trkCtrl
 */
function TrunkController($scope, $parse, Leaf) {
  const _self = this;

  _self.leafs = [];
  _self.currentSearch = "";
  _self.selectedLeaf = false;

  //Controller exposed functions

  /**
   * @memberOf TrunkController
   */
  _self.selectLeaf = function (leafController, $event) {
    const lastSelected = $parse('selectedLeaf.leafData')(_self);
    const newSelected = leafController.leafData;
    
    //unselect previous
    if(lastSelected){
      const isToggle = newSelected.isSelected() && lastSelected.isSelected();
      lastSelected.setSelected(false);
  
      if(isToggle){
        newSelected.setSelected(false);
        _self.selectedLeaf = undefined;
      } else {
        newSelected.setSelected(true);
        _self.selectedLeaf = leafController;
      }
    } else {
      newSelected.setSelected(true);
      _self.selectedLeaf = leafController;
    }
    
    
    if ($event) {
      $event.stopPropagation();
    }
  };

  /**
   * @memberOf TrunkController
   */
  _self.addLeaf = function (label, description) {
    //const newLeaf = new Leaf(label, description);
    const newLeaf = new Leaf("Text", "Description");

    if (_self.selectedLeaf){
      _self.selectedLeaf.leafData.addLeaf(newLeaf);
    } else {
      _self.leafs.push(newLeaf);
    }
  };
}