(function () {
    "use strict";
    
    /*global angular*/
    angular
        .module('Tree')
        .factory('Leaf', [LeafFactory]);
    
    function LeafFactory() {
        
        /**
         * Leaf Model
         * @class Leaf
         * @constructor
         * @param {String} initialLabel
         * @param {String} initialDescription
         */
        class Leaf {
            
            constructor(label, description){
                this._label = label;
                this._description = description;
                this._leafs = [];
                this._expanded = true;
                this._selected = false;
            }
            
            get description() {
                return this._description;
            }
            
            set description(description) {
                this._description = description;
            }
            
            get label() {
                return this._label;
            }
            
            set label(label) {
                this._label = label;
            }
            
            get leafs() {
                return this._leafs;
            }
            
            set leafs(leafs) {
                this._leafs = leafs;
            }
            
            get selected() {
                return this._selected;
            }
            
            set selected(selected) {
                this._selected = selected;
            }
            
            get expanded() {
                return this._expanded;
            }
            
            set expanded(expanded) {
                this._expanded = expanded;
            }
            
            get index() {
                return this._index;
            }
            
            set index(index) {
                this._index = index;
            }
            
            get parent() {
                return this._parent;
            }
            
            set parent(parent) {
                this._parent = parent;
            }
            
            hasChildren() {
                return !!this.leafs.length;
            }
            
            removeFromParent() {
                return this.parent.leafs.splice(_self.index, 1);
            }
            
            addLeaf(leaf) {
                leaf.parent = this;
                leaf.index = this._leafs.length;
    
                this.expanded = true;
                this.leafs.push(leaf);
            }
        }
        
        return Leaf;
    }
}());
