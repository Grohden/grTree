(function () {
    /**
     * @ngdoc directive
     * @name Tree:materializeTooltip
     *
     * @description
     * Tooltip initialization wrapper for materialize tooltips
     *
     * @restrict A
     **/

    angular
        .module('Tree')
        .directive('materializeTooltip', ['$timeout', TooltipDirective]);

    function TooltipDirective($timeout) {
        return {
            restrict: 'A',
            scope:{
                materializeTooltip:"="
            },
            link: function (scope, element, attr) {
                if(!scope.materializeTooltip){
                    return;
                }

                $timeout(function () {
                    $(element).tooltip({delay: 50});
                });
            }
        };
    }
}());
