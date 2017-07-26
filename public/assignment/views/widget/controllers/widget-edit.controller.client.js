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
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function updateWidget(widget)
        {
            widgetService.updateWidget(model.widgetId, widget);
            goBack();
        }

        function deleteWidget()
        {
            widgetService.deleteWidget(model.widgetId);
            goBack();
        }
    }
})();