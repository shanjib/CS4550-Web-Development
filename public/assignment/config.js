(function()
{
    angular
        .module("WamApp")
        .config(configuration);

    function configuration ($routeProvider)
    {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/user-login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/user-login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/user-register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:uId", {
                templateUrl: "views/user/templates/user-profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-new.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/profile/:uId/website/:wid/page/:pid/widget/:wgid/search", {
                templateUrl: "views/widget/editors/widget-flickr-edit.view.client.html",
                controller: "flickrController",
                controllerAs: "model"
            })
    }
})();