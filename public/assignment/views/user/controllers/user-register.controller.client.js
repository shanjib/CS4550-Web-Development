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
            var _user = userService.findUserByUsername(user.username);
            if (_user)
            {
                model.errorMessage = "Username Taken";
                return;
            }
            var user = userService.createUser(user);
            $location.url("/profile/" + user._id);
        }

        function cancel()
        {
            $location.url("/");
        }
    }
})();
