(function ()
{
    angular
        .module("WorkApp")
        .controller("exerciseListController", exerciseListController);

    function exerciseListController($routeParams, $location, $sce, exerciseService, workUserService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.workoutId = $routeParams.wid;

        model.removeExercise = removeExercise;
        model.trustHTMLContent = trustHTMLContent;
        model.goBack = goBack;
        model.goToNew = goToNew;

        function init()
        {
            exerciseService
                .findExercisesByWorkoutId(model.workoutId)
                .then(function (response) {
                    model.exercises = response.data;
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

        function trustHTMLContent(content)
        {
            return $sce.trustAsHtml(content);
        }

        function goBack()
        {
            $location.url("/profile/" + model.userId + "/workout/");
        }

        function removeExercise(exerciseId)
        {
            exerciseService
                .deleteExercise(model.workoutId, exerciseId)
                .then(function (response) {
                    $location.url("/profile/" + model.userId + "/workout/" + model.workoutId + "/exercise/");
                }, function (err) {
                    alert("deleted fail");
                })
        }

        function goToNew()
        {
            $location.url("/profile/" + model.userId + "/workout/" + model.workoutId + "/exercise/new");
        }
    }
})();