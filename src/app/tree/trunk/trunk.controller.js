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
        
        _self.currentSearch = "";
        
        _self.root = new Leaf("Root Leaf", "Root leaf is just a dummy leaf");
        _self.newLeaf = new Leaf();
        
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
                const isToggle = newSelected.selected && lastSelected.selected;
                
                if (isToggle) {
                    _self.selectedController = false;
                } else {
                    _self.selectedController = leafController;
                }
                
                lastSelected.selected = false;
                newSelected.selected = !isToggle;
                
            } else {
                newSelected.selected = true;
                _self.selectedController = leafController;
            }
            
            if ($event) {
                $event.stopPropagation();
            }
        };
        
        /**
         * @memberOf TrunkController
         * @param {Event} event
         */
        _self.doSearch = function (event) {
            const searchString = event.currentTarget.value;
            
            if (searchString) {
                _self.isSearch = true;
                _self.search = getIfMatch(searchString, _self.root);
                console.log(_self.search);
            } else {
                _self.isSearch = false;
            }
            
            
        };
        
        /**
         * @param {String} search
         * @param {Leaf} leaf
         * */
        function getIfMatch(search, leaf) {
            const leafs = leaf.leafs;
            
            if (!leaf.label.includes(search)) {
                if (leafs.length) {
                    return leafs.reduce((acc, child) => {
                        let result = getIfMatch(search, child);
                        if (result) {
                            acc.push(Object.assign({leafs: result}, leaf));
                        }
                        return acc;
                    }, []);
                } else {
                    return false;
                }
            } else {
                return Object.assign({searchResult: true}, leaf);
            }
        }
        
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
            
            let leafData;
            if (_self.selectedController) {
                leafData = _self.selectedController.leafData;
            } else {
                leafData = _self.root;
            }
            
            leafData.addLeaf(_self.newLeaf);
            
            _self.newLeaf = new Leaf();
            return true;
        };
    }
}());
