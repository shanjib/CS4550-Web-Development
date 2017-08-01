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
            var promise = websiteService.findWebsitesByUser(model.userId);
            promise
                .then(function (response) {
                    model.websites = response.data;
                });
            var promise2 = websiteService.findWebsiteById(model.websiteId);
            promise2
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
            var promise = websiteService.deleteWebsite(model.websiteId);
            promise
                .then(function (response) {
                    goBack();
                });
        }

        function updateWebsite(website)
        {
            var promise = websiteService.updateWebsite(model.websiteId, website);
            promise
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