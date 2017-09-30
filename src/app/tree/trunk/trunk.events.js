angular
  .module("Tree")
  .constant("TrunkEvents", TrunkEvents);


/***
 * @typedef TrunkEvents {Object}
 * @property {string} SEARCH_EVENT - Emitted on search request
 */
function TrunkEvents(){
    return {
      SEARCH_EVENT:"SEARCH_EVENT"
    }
  }
