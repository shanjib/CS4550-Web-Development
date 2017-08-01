(function ()
{
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, $location, pageService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;

        model.goBack = goBack;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;
        model.goToWidget = goToWidget;

        function init()
        {
            var promise = pageService.findPagesByWebsiteId(model.websiteId);
            promise
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website");
        }

        function goToNew()
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/new");
        }

        function goToEdit(pageId)
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + pageId);
        }

        function goToWidget(pageId)
        {
            $location.url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + pageId + "/widget");

        }
    }
})();