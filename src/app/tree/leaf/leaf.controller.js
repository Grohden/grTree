(function () {
    "use strict";
    
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
        
        /**
         * Toggle the leaf children
         * @member editData
         * @function
         * @param {Event} [$event]
         */
        _self.toggleExpanded = function ($event) {
            const leaf = _self.leafData;
            
            leaf.setExpanded(!leaf.isExpanded());
            
            if ($event) {
                $event.stopPropagation();
            }
        };
        
        //Scope things
        $scope.$on(TrunkEvents.CLOSE_ALL_LEAFS, function () {
            const leaf = _self.leafData;
            leaf.setExpanded(false);
        });
        
        $scope.$on(TrunkEvents.OPEN_ALL_LEAFS, function () {
            const leaf = _self.leafData;
            leaf.setExpanded(false);
        });
        
    }
}());