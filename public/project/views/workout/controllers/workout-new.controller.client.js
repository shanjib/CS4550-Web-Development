(function ()
{
    angular
        .module("WorkApp")
        .controller("workoutNewController", workoutNewController);

    function workoutNewController($routeParams, $location, workoutService, workUserService)
    {
        var model = this;

        model.userId = $routeParams.uId;

        model.createWorkout = createWorkout;
        model.addWorkout = addWorkout;
        model.goBack = goBack;
        model.goToNew = goToNew;
        model.goToEdit = goToEdit;

        function init()
        {
            workoutService
                .findWorkouts()
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

        function createWorkout(workout)
        {
            if (!workout)
            {
                model.errorMessage = "Workout not valid";
                return;
            }
            workoutService
                .createWorkout(model.userId, workout)
                .then(function (response) {
                    goBack();
                }, function (err) {
                    model.errorMessage = "Error creating Workout"
                });
        }

        function addWorkout(workoutId)
        {
            workoutService
                .addWorkout(model.userId, workoutId)
                .then(function (response) {
                    goBack();
                }, function (err) {
                    model.errorMessage = "Error adding Workout"
                });
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/workout");
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