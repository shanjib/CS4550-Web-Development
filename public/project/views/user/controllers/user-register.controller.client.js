(function()
{
    angular
        .module("WorkApp")
        .controller("registerController", registerController);

    function registerController(workUserService, $location)
    {
        var model = this;

        model.registerUser = registerUser;
        model.cancel = cancel;

        function init()
        {
        }
        init();

        function registerUser(user)
        {
            workUserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    if (response.data === null)
                    {
                        return workUserService.createUser(user);
                    }
                    else
                    {
                        model.errorMessage = "Username Taken";
                    }
                }, function (err) {
                    model.errorMessage = "Error creating user";
                })
                .then(function (response) {
                    var _user = response.data;
                    $location.url("/profile/" + _user._id);
                });
        }

        function cancel()
        {
            $location.url("/");
        }
    }
})();
