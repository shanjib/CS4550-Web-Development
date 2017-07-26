(function ()
{
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, websiteService)
    {
        var model = this;

        model.userId = $routeParams.uId;

        model.createWebsite = createWebsite;
        model.goBack = goBack;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website)
        {
            websiteService.createWebsite(model.userId, website);
            goBack();
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website");
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