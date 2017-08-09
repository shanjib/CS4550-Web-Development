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
            websiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
            websiteService.findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/website");
        }

        function deleteWebsite()
        {
            websiteService.deleteWebsite(model.userId, model.websiteId)
                .then(function (response) {
                    goBack();
                });
        }

        function updateWebsite(website)
        {
            websiteService.updateWebsite(model.websiteId, website)
                .then(function (response) {
                    goBack();
                });
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