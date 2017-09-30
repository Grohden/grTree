angular.module("Tree").controller("LeafController", [
  "$scope",
  "TrunkEvents",
  LeafController
]);

/**
 * @class LeafController
 * @alias leafCtrl
 * @param {{leafData:Leaf, $on: Function}} $scope
 * @param {TrunkEvents} TrunkEvents
 */

function LeafController($scope, TrunkEvents) {

  const _self = this;

  /**
   * @member isSearchMatch
   * @type Boolean
   */
  _self.isSearchMatch = false;

  /**
   * @member isInEditMode
   * @type Boolean
   */
  _self.isInEditMode = true;

  /**
   * @member editData
   * @type Array
   */
  _self.editData = {};

  //Scope things
  $scope.$on(TrunkEvents.SEARCH_EVENT, function(searchString){
    const label= $scope.leafData.getLabel();
    _self.isSearchMatch = label.includes(searchString);
  })


}