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
  function Leaf(initialLabel, initialDescription) {
    const _self = this;
    const _leafs = [];
    let label = initialLabel;
    let description = initialDescription;
    let expanded = true;
    let selected = false;

    /**
     * @function setSelected
     * @name Leaf#setSelected
     */
    _self.setSelected = function (value) {
      selected = value;
    };

    /**
     * @function isSelected
     * @name Leaf#isSelected
     */
    _self.isSelected = function () {
      return selected;
    };

    /**
     * @function setLabel
     * @name Leaf#setLabel
     */
    _self.setLabel = function (newLabel) {
      label = newLabel;
    };

    /**
     * @function setDescription
     * @name Leaf#setDescription
     */
    _self.setDescription = function (newDescription) {
      description = newDescription;
    };

    /**
     * @function getLabel
     * @name Leaf#getLabel
     * @return {string}
     */
    _self.getLabel = function () {
      return label;
    };

    /**
     * @function getDescription
     * @name Leaf#getDescription
     */
    _self.getDescription = function () {
      return description;
    };

    /**
     * @function isExpanded
     * @name Leaf#isExpanded
     */
    _self.isExpanded = function () {
      return expanded;
    };

    /**
     * @function setExpanded
     * @name Leaf#setExpanded
     */
    _self.setExpanded = function (value) {
      expanded = value;
    };

    /**
     * @function hasChildren
     * @name Leaf#hasChildren
     */
    _self.hasChildren = function () {
      return _leafs.length;
    };

    /**
     * @function addLeaf
     * @name Leaf#addLeaf
     */
    _self.addLeaf = function (leaf) {
      _self.setExpanded(true);
      _leafs.push(leaf);
    };

    /**
     * @function getLeafs
     * @name Leaf#getLeafs
     */
    _self.getLeafs = function () {
      return _leafs;
    };

    return _self;
  }

  return Leaf;
}