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
        model.goToEdit = goToEdit;
        model.goBack = goBack;

        function init()
        {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
            pageService.findPageById(model.pageId)
                .then(function (response) {
                    model.page = response.data;
                });
        }
        init();

        function updatePage(page)
        {
            pageService.updatePage(model.pageId, page)
                .then(function (response) {
                    goBack();
                });
        }

        function deletePage()
        {
            pageService.deletePage(model.websiteId, model.pageId)
                .then(function (response) {
                    goBack();
                });
        }

        function goToEdit(pageId)
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + pageId);
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();