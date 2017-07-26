(function ()
{
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.goBack = goBack;
        model.goToEdit = goToEdit;
        model.goToHeading = goToHeading;
        model.goToImage = goToImage;
        model.goToYoutube = goToYoutube;
        model.goToHTML = goToHTML;

        function init()
        {
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function goToEdit(widgetId)
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widgetId);
        }

        function goToHeading()
        {
            var widget = { "widgetType": "HEADING", "text": "" };
            widget = widgetService.createWidget(model.pageId, widget);
            goToEdit(widget._id)
        }

        function goToImage()
        {
            var widget = { "widgetType": "IMAGE", "url": "", "width": "100%" };
            widget = widgetService.createWidget(model.pageId, widget);
            goToEdit(widget._id)
        }

        function goToYoutube()
        {
            var widget = { "widgetType": "YOUTUBE", "url": "", "width": "100%" };
            widget = widgetService.createWidget(model.pageId, widget);
            goToEdit(widget._id)
        }

        function goToHTML()
        {
            var widget = { "widgetType": "HTML", "text": "" };
            widget = widgetService.createWidget(model.pageId, widget);
            goToEdit(widget._id)
        }
    }
})();