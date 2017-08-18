(function()
{
    angular
        .module("WorkApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, workUserService)
    {
        var model = this;
        var userId = $routeParams.uId;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.goBack = goBack;

        function init()
        {
            workUserService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user)
        {
            workUserService.updateUser(userId, user);
        }

        function deleteUser()
        {
            workUserService.deleteUser(userId)
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