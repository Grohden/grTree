angular.module('Tree').factory('Leaf', [LeafFactory]);

function LeafFactory() {

  /**
   * Leaf Model
   * @typedef {Object} LeafModel
   * @param {String} label
   * @param {String} description
   */
  function Leaf(label, description) {
    const _leafs = [];
    let _label = label;
    let _description = description;
    let _expanded = true;

    function setLabel(newLabel) {
      _label = newLabel;
    }

    function setDescription(newDescription) {
      _description = newDescription;
    }

    function getLabel() {
      return _label;
    }

    function getDescription() {
      return _description;
    }


    function isExpanded() {
      return _expanded;
    }

    function setExpanded(value) {
      _expanded = value;
    }

    function hasChildren() {
      return _leafs.length;
    }

    function addLeaf(leaf) {
      setExpanded(true);
      _leafs.push(leaf);
    }

    function getLeafs() {
      return _leafs;
    }


    return {
      getDescription,
      setDescription,
      getLabel,
      setLabel,
      isExpanded,
      setExpanded,
      hasChildren,
      addLeaf,
      getLeafs
    };
  }

  return Leaf;
}