(function () {
    "use strict";
    
    /*global angular*/
    angular
        .module("Tree")
        .controller("TrunkController", [
            "$scope",
            "$parse",
            "Leaf",
            "TrunkEvents",
            TrunkController
        ]);
    
    /**
     *
     * @class TrunkController
     * @constructor
     * @param {Object} $scope
     * @param {Function} $parse
     * @param {Leaf} Leaf
     * @param {TrunkEvents} TrunkEvents
     * @alias trkCtrl
     */
    function TrunkController($scope, $parse, Leaf, TrunkEvents) {
        const _self = this;
        
        _self.root = new Leaf("Root Leaf", "Root leaf is just a dummy leaf");
        _self.currentSearch = "";
        _self.newLeaf = {};
        
        _self.selectedController = false;
        
        //Controller exposed functions
        
        /**
         * @memberOf TrunkController
         */
        _self.selectLeaf = function (leafController, $event) {
            const lastSelected = $parse('selectedController.leafData')(_self);
            const newSelected = leafController.leafData;
            
            //unselect previous
            if (lastSelected) {
                const isToggle = newSelected.isSelected() && lastSelected.isSelected();
                
                if (isToggle) {
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
    
        /**
         * @memberOf TrunkController
         */
        _self.removeLeaf = function () {
            _self.selectedController.leafData.removeFromParent();
            _self.selectedController = false;
        };
        
        /**
         * @memberOf TrunkController
         */
        _self.closeAllTree = function () {
            $scope.$broadcast(TrunkEvents.CLOSE_ALL_LEAFS);
        };
    
        /**
         * @memberOf TrunkController
         */
        _self.openAllTree = function () {
            $scope.$broadcast(TrunkEvents.OPEN_ALL_LEAFS);
        };
    
        _self.newLeafIsInvalid = function () {
            return !(_self.newLeaf.label && _self.newLeaf.description);
        };
        /**
         * @memberOf TrunkController
         */
        _self.addLeaf = function () {
            if (_self.newLeafIsInvalid()) {
                return false;
            }
        
            const newLeaf = new Leaf(_self.newLeaf.label,
                _self.newLeaf.description);
            
            let leafData;
            if (_self.selectedController) {
                leafData = _self.selectedController.leafData;
            } else {
                leafData = _self.root;
            }
            
            leafData.addLeaf(newLeaf);
        
            _self.newLeaf = {};
            return true;
        };
    }
}());
