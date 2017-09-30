angular.module('Tree').factory('Leaf', [LeafFactory]);

function LeafFactory() {

  /**
   * Leaf Model
   * @typedef {Object} LeafModel
   * @param {String} label 
   * @param {String} description 
   */
  function Leaf(label, description) {
    const instance = this;
    let _label = label;
    let _description = description;

    function setLabel(newLabel) {
      _label = newLabel;
      return instance;
    }

    function setDescription(newDescription) {
      _description = newDescription;
      return instance;
    }

    function getLabel() {
      return _label;
    }

    function getDescription() {
      return _description;
    }

    return {
      getDescription,
      setDescription,
      getLabel,
      setLabel
    };
  }
  return Leaf;
}