(function ()
{
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;

        model.goBack = goBack;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website");
        }

        function deleteWebsite()
        {
            websiteService.deleteWebsite(model.websiteId);
            goBack();
        }

        function updateWebsite(website)
        {
            websiteService.updateWebsite(model.websiteId, website);
            goBack();
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