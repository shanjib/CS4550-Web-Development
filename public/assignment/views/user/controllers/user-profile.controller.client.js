(function()
{
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService)
    {
        var model = this;
        var userId = $routeParams.uId;
        function init()
        {
            model.user = userService.findUserById(userId);
        }
        init();
    }
})();