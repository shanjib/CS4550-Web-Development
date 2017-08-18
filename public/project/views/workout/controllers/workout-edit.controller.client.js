(function ()
{
    angular
        .module("WorkApp")
        .controller("workoutEditController", workoutEditController);

    function workoutEditController($routeParams, $location, workoutService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.workoutId = $routeParams.wid;

        model.goBack = goBack;
        model.deleteWorkout = deleteWorkout;
        model.updateWorkout = updateWorkout;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            workoutService.findWorkoutsByUser(model.userId)
                .then(function (response) {
                    model.workouts = response.data;
                });
            workoutService.findWorkoutById(model.workoutId)
                .then(function (response) {
                    model.workout = response.data;
                });
        }
        init();

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/workout");
        }

        function deleteWorkout()
        {
            workoutService.deleteWorkout(model.userId, model.workoutId)
                .then(function (response) {
                    goBack();
                });
        }

        function updateWorkout(workout)
        {
            workoutService.updateWorkout(model.workoutId, workout)
                .then(function (response) {
                    goBack();
                });
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