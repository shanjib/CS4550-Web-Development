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

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.goToSearch = goToSearch;
        model.goBack = goBack;

        function init()
        {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();

        function updateWidget(widget)
        {
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (response) {
                    goBack();
                });
        }

        function deleteWidget()
        {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(function (response) {
                    goBack();
                });
        }

        function goToSearch()
        {
            $location
                .url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId + "/search");
        }

        function goBack()
        {
            $location
                .url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();