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
            pageService.deletePage(model.pageId)
                .then(function (response) {
                    goBack();
                });
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();