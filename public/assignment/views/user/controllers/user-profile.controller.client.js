(function()
{
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService)
    {
        var model = this;
        var userId = $routeParams.uId;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.goBack = goBack;

        function init()
        {
            var promise = userService.findUserById(userId);
            promise
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user)
        {
            var promise = userService.updateUser(userId, user);
        }

        function deleteUser()
        {
            var promise = userService.deleteUser(userId);
            promise
                .then(function (response) {
                    goBack();
                });
        }

        function goBack()
        {
            $location.url("/");
        }
    }
})();