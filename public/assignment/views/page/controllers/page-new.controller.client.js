(function ()
{
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, pageService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;

        model.createPage = createPage;
        model.goToEdit = goToEdit;
        model.goBack = goBack;

        function init()
        {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function createPage(page)
        {
            pageService.createPage(model.websiteId, page)
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