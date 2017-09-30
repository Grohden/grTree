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
    _self.selectedLeaf = leafController;

    if ($event) {
      $event.stopPropagation();
    }
  };

  _self.addLeaf = function (label, description) {
    //const newLeaf = new Leaf(label, description);
    const newLeaf = new Leaf("Text", "Description");
    const leafArray = (() => {
      if (_self.selectedLeaf) {
        return _self.selectedLeaf.leafs;
      } else {
        return _self.leafs;
      }
    })();

    leafArray.push(newLeaf);
  };
}