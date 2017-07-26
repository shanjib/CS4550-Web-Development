(function ()
{
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, $location, websiteService)
    {
        var model = this;

        model.userId = $routeParams.uId;

        model.goBack = goBack;
        model.goToPage = goToPage;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId);
        }

        function goToPage(websiteId)
        {
            $location.url("/profile/" + model.userId + "/website/" + websiteId + "/page");
        }

        function goToNew()
        {
            $location.url("/profile/" + model.userId + "/website/new");
        }

        function goToEdit(websiteId)
        {
            $location.url("/profile/" + model.userId + "/website/" + websiteId);
        }
    }
})();