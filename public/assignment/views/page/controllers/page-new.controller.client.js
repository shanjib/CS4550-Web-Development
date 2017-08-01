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
        model.goBack = goBack;

        function init()
        {
        }
        init();

        function createPage(page)
        {
            var promise = pageService.createPage(model.websiteId, page);
            promise
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