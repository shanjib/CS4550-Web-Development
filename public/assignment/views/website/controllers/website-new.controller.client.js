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
            websiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function createWebsite(website)
        {
            if (!website)
            {
                model.errorMessage = "Website not valid"
            }
            websiteService.createWebsite(model.userId, website)
                .then(function (response) {
                    goBack();
                }, function (err) {
                    model.errorMessage = "Website not valid"
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