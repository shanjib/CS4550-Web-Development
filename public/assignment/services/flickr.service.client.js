(function()
{
    angular
        .module("WamApp")
        .factory("flickrService", flickrService);

    function flickrService($http)
    {
        var key = "189bf70ad97e770437f3a0941ecf2f0f";
        var secret = "37926ed896d5fae6";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api =
            {
                "searchPhotos": searchPhotos
            };
        return api;

        function searchPhotos(searchText)
        {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();