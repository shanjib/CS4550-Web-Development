(function()
{
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location)
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
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "0")
                    {
                        return userService.createUser(user);
                    }
                    else
                    {
                        model.errorMessage = "Username Taken";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/profile/" + _user._id);
                });
        }

        function cancel()
        {
            $location.url("/");
        }
    }
})();
