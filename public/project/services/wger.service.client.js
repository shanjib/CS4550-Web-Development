(function()
{
    angular
        .module("WorkApp")
        .factory("wgerService", wgerService);

    function wgerService($http)
    {
        var urlBase = "https://wger.de/api/v2/exercise/?name=TEXT";

        var api =
            {
                "searchExercise": searchExercise
            };
        return api;

        function searchExercise(searchText)
        {
            var url = urlBase
                .replace("TEXT", searchText);
            var headers =
                {
                    'Authorization': 'Token 4c7ad3d52ef6e77f8b9251a9db30fc22faf4c77e',
                    'Accept': 'application/json; indent=4'
                };
            return $http.get(url, headers);
        }
    }
})();