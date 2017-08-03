(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective($http)
    {
        function linkFunction(scope, element)
        {
            $("#sortable")
                .sortable(
                    {
                        start: function (event, ui) {
                            initial = ui.item.index();
                        },
                        stop: function (event, ui) {
                            final = ui.item.index();
                            var url = "/api/page/" + scope.model.pageId + "/widget?initial=" + initial + "&final=" + final;
                            $http.put(url);
                        }
                    }
                );
        }
        return {
            link: linkFunction
        }
    }
})();