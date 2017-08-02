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
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user)
        {
            userService.updateUser(userId, user);
        }

        function deleteUser()
        {
            userService.deleteUser(userId)
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