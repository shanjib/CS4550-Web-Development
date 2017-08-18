(function ()
{
    angular
        .module("WorkApp")
        .factory("workUserService", workUserService);

    function workUserService($http)
    {
        var api =
            {
                "createUser": createUser,
                "findUserById": findUserById,
                "findUserByUsername": findUserByUsername,
                "findUserByCredentials": findUserByCredentials,
                "updateUser": updateUser,
                "deleteUser": deleteUser
            };
        return api;

        function createUser(user)
        {
            var url = "/api2/user";
            return $http.post(url, user);
        }

        function findUserByCredentials(username, password)
        {
            var url = "/api2/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(userId)
        {
            var url = "/api2/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username)
        {
            var url = "/api2/user?username=" + username;
            return $http.get(url);
        }

        function updateUser(userId, user)
        {
            var url = "/api2/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId)
        {
            var url = "/api2/user/" + userId;
            return $http.delete(url);
        }
    }
})();