(function ()
{
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.goBack = goBack;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init()
        {
            var promise = widgetService.findWidgetById(model.widgetId);
            promise
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();

        function updateWidget(widget)
        {
            var promise = widgetService.updateWidget(model.widgetId, widget);
            promise
                .then(function (response) {
                    goBack();
                });
        }

        function deleteWidget()
        {
            var promise = widgetService.deleteWidget(model.widgetId);
            promise
                .then(function (response) {
                    goBack();
                });
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();