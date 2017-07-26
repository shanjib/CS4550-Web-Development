(function ()
{
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, pageService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        model.updatePage = updatePage;
        model.deletePage = deletePage;
        model.goBack = goBack;

        function init()
        {
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page)
        {
            pageService.updatePage(model.pageId, page);
            goBack();
        }

        function deletePage()
        {
            pageService.deletePage(model.pageId);
            goBack();
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();