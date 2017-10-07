(function () {
    "use strict";

    /*global angular*/
    angular
        .module("Tree")
        .controller("TrunkController", [
            "$scope",
            "Leaf",
            "TrunkEvents",
            TrunkController
        ]);

    /**
     * @class TrunkController
     * @constructor
     * @param {Object} $scope
     * @param {Leaf} Leaf
     * @param {TrunkEvents} TrunkEvents
     * @alias trkCtrl
     */
    function TrunkController($scope, Leaf, TrunkEvents) {
        const _self = this;

        _self.currentSearch = "";

        _self.root = new Leaf("Root Leaf", "Root leaf is just a dummy leaf")

        //Used leaf reference to
        _self.shownLeaf = _self.root;

        _self.newLeaf = new Leaf();

        _self.selectedLeaf = false;

        _self.isInSearchMode = false;

        //Controller exposed functions

        /**
         * Toggle the leaf children
         * @function
         * @param {Leaf} leaf
         * @param {Event} [$event]
         */
        _self.toggleExpanded = function (leaf, $event) {

            leaf.expanded = !leaf.expanded;

            if ($event) {
                $event.stopPropagation();
            }
        };

        /**
         * @memberOf TrunkController
         * @param {Leaf} leaf
         * @param {Event} $event
         */
        _self.selectLeaf = function (leaf, $event) {
            const lastSelected = _self.selectedLeaf;
            const newSelected = leaf;

            //unselect previous
            if (lastSelected) {
                const isToggle = newSelected.selected && lastSelected.selected;

                if (isToggle) {
                    _self.selectedLeaf = false;
                } else {
                    _self.selectedLeaf = leaf;
                }

                lastSelected.selected = false;
                newSelected.selected = !isToggle;

            } else {
                newSelected.selected = true;
                _self.selectedLeaf = leaf;
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
                _self.isInSearchMode = true;
                _self.shownLeaf  = {leafs: findHierarchy(searchString)(_self.root)};
            } else {
                _self.isInSearchMode = false;
                _self.shownLeaf = _self.root;
            }
        };

        function findHierarchy(searchString){
            const isSearchMatch = leaf => leaf.label.toUpperCase().includes(searchString.toUpperCase());
            return function findInLeafs(leaf){
                const leafs = leaf.leafs;

                return leafs.length
                    ? leafs.filter(child => isSearchMatch(child) || findInLeafs(child).length)
                    : isSearchMatch(leaf) && [leaf];
            };
        }

        /**
         * @memberOf TrunkController
         */
        _self.removeLeaf = function () {
            _self.selectedLeaf.removeFromParent();
            _self.selectedLeaf = false;
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
            return !_self.newLeaf.label;

            //return !(_self.newLeaf.label && _self.newLeaf.description);
        };
        /**
         * @memberOf TrunkController
         */
        _self.addLeaf = function () {
            if (_self.newLeafIsInvalid()) {
                return false;
            }
            console.log(_self.shownLeaf);

            let leafData;
            if (_self.selectedLeaf) {
                leafData = _self.selectedLeaf;
            } else {
                leafData = _self.root;
            }

            leafData.addLeaf(_self.newLeaf);

            _self.newLeaf = new Leaf();
            return true;
        };
    }
}());
