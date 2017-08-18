(function ()
{
    angular
        .module("WorkApp")
        .controller("workoutListController", workoutListController);

    function workoutListController($routeParams, $location, workoutService, workUserService)
    {
        var model = this;

        model.userId = $routeParams.uId;

        model.goBack = goBack;
        model.goToExercises = goToExercises;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            workoutService.findWorkoutsByUser(model.userId)
                .then(function (response) {
                    model.workouts = response.data;
                });
            workUserService
                .findUserById(model.userId)
                .then(function (response) {
                    var role = response.data.role;
                    model.regular = role === "Regular";
                    model.trainer = role === "Trainer";
                    model.leader = role === "Leader";
                });
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId);
        }

        function goToExercises(workoutId)
        {
            $location.url("/profile/" + model.userId + "/workout/" + workoutId + "/exercise");
        }

        function goToNew()
        {
            $location.url("/profile/" + model.userId + "/workout/new");
        }

        function goToEdit(workoutId)
        {
            $location.url("/profile/" + model.userId + "/workout/" + workoutId);
        }
    }
})();