angular.module("Tree").controller("TrunkController", [
  "Leaf",
  TrunkController
]);

function TrunkController(Leaf) {
  const _self = this;

  _self.leafs = [];
  _self.currentSearch = "";
  _self.selectedLeaf = false;

  _self.selectLeaf = function (leafController, $event) {
    const lastSelected = _self.selectedLeaf.leafData;

    //unselect previous
    if(lastSelected){
     lastSelected.setSelected(false);
    }

    leafController.leafData.setSelected(true);
    _self.selectedLeaf = leafController;

    if ($event) {
      $event.stopPropagation();
    }
  };

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