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

  _self.root = new Leaf("Root Leaf", "Root leaf is just a dummy leaf");
  _self.currentSearch = "";
  _self.selectedController = false;

  //Controller exposed functions

  /**
   * @memberOf TrunkController
   */
  _self.selectLeaf = function (leafController, $event) {
    const lastSelected = $parse('selectedController.leafData')(_self);
    const newSelected = leafController.leafData;
    
    //unselect previous
    if(lastSelected){
      const isToggle = newSelected.isSelected() && lastSelected.isSelected();

      if(isToggle){
        _self.selectedController = false;
      } else {
        _self.selectedController = leafController;
      }

      lastSelected.setSelected(false);
      newSelected.setSelected(!isToggle);

    } else {
      newSelected.setSelected(true);
      _self.selectedController = leafController;
    }
    
    
    if ($event) {
      $event.stopPropagation();
    }
  };

  _self.removeLeaf = function(){
    _self.selectedController.leafData.removeFromParent();
    _self.selectedController = false;
  };


  /**
   * @memberOf TrunkController
   */
  _self.addLeaf = function (label, description) {
    //const newLeaf = new Leaf(label, description);
    const newLeaf = new Leaf("Text", "Description");

    let leafData;
    if (_self.selectedController){
      leafData = _self.selectedController.leafData;
    } else {
      leafData  = _self.root;
    }

    leafData.addLeaf(newLeaf);
  };
}