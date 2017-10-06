(function () {
    "use strict";
    angular
        .module("Tree")
        .constant("TrunkEvents", TrunkEvents());
    
    /***
     * @typedef TrunkEvents {Object}
     * @property {string} OPEN_ALL_LEAFS - Emited when user click on open leafs button
     * @property {string} CLOSE_ALL_LEAFS - Emited when user click on close all leafs button
     */
    function TrunkEvents() {
        return {
            CLOSE_ALL_LEAFS: "CLOSE_ALL_LEAFS",
            OPEN_ALL_LEAFS: "OPEN_ALL_LEAFS"
        };
    }
}());
