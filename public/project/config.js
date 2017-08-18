(function()
{
    angular
        .module("WorkApp")
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
            .when("/profile/:uId/workout", {
                templateUrl: "views/workout/templates/workout-list.view.client.html",
                controller: "workoutListController",
                controllerAs: "model"
            })
            .when("/profile/:uId/workout/new", {
                templateUrl: "views/workout/templates/workout-new.view.client.html",
                controller: "workoutNewController",
                controllerAs: "model"
            })
            .when("/profile/:uId/workout/:wid", {
                templateUrl: "views/workout/templates/workout-edit.view.client.html",
                controller: "workoutEditController",
                controllerAs: "model"
            })
            .when("/profile/:uId/workout/:wid/exercise", {
                templateUrl: "views/exercises/templates/exercise-list.view.client.html",
                controller: "exerciseListController",
                controllerAs: "model"
            })
            .when("/profile/:uId/workout/:wid/exercise/new", {
                templateUrl: "views/exercises/templates/exercise-new.view.client.html",
                controller: "exerciseNewController",
                controllerAs: "model"
            })
            .when("/profile/:uId/workout/:wid/exercise/:eid", {
                templateUrl: "views/exercises/templates/exercise-edit.view.client.html",
                controller: "exerciseEditController",
                controllerAs: "model"
            })
    }
})();