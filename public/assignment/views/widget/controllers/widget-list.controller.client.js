(function ()
{
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $location, $sce, widgetService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        model.goBack = goBack;
        model.goToEdit = goToEdit;
        model.goToNew = goToNew;
        model.trustHTMLContent = trustHTMLContent;
        model.trustURLResource = trustURLResource;

        function init()
        {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response.data;
                });
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function goToEdit(widgetId)
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widgetId);
        }

        function goToNew()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/new");
        }

        function trustHTMLContent(content)
        {
            return $sce.trustAsHtml(content);
        }

        function trustURLResource(url)
        {
            var youtubeURL = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeURL += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeURL);
        }
    }
})();