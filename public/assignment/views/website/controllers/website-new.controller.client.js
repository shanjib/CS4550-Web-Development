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
            var promise = websiteService.findWebsitesByUser(model.userId);
            promise
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function createWebsite(website)
        {
            var promise = websiteService.createWebsite(model.userId, website);
            promise
                .then(function (response) {
                    goBack();
                });
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