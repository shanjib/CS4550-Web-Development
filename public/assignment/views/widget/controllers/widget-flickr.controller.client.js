(function ()
{
    angular
        .module("WamApp")
        .controller("flickrController", flickrController);

    function flickrController($routeParams, $location, flickrService, widgetService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.goBack = goBack;

        function searchPhotos(searchText)
        {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo)
        {
            var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    var widget = response.data;
                    widget.url = url;
                    return widgetService.updateWidget(model.widgetId, widget);
                })
                .then(function (response) {
                    goBack();
                });
        }

        function goBack()
        {
            $location
                .url("/profile/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }
    }
})();