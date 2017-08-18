(function ()
{
    angular
        .module("WorkApp")
        .controller("workoutListController", workoutListController);

    function workoutListController($routeParams, $location, workoutService)
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