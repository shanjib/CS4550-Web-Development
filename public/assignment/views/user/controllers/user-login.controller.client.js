(function()
{
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService)
    {
        var model = this;
        model.login = login;

        function init()
        {

        }
        init();

        function login(user)
        {
            if (!user)
            {
                model.errorMessage = "Username or Password given was not accurate"
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if (user === null)
            {
                model.errorMessage = "Username or Password given was not accurate"
            }
            else
            {
                $location.url("profile/" + user._id);
            }
        }
    }
})();