(function ()
{
    angular
        .module("WorkApp")
        .controller("exerciseNewController", exerciseNewController);

    function exerciseNewController($routeParams, $location, $sce, wgerService, exerciseService)
    {
        var model = this;

        model.userId = $routeParams.uId;
        model.workoutId = $routeParams.wid;
        model.exerciseId = $routeParams.wgid;

        model.searchExercise = searchExercise;
        model.addExercise = addExercise;
        model.trustHTMLContent = trustHTMLContent;
        model.goBack = goBack;

        function searchExercise(searchText)
        {
            wgerService
                .searchExercise(searchText)
                .then(function(response) {
                    if (response.data.count === 0)
                    {
                        model.errorMessage = "No exercises found!";
                    }
                    else
                    {
                        model.exercises = response.data.results;
                        model.errorMessage = "";
                    }
                });
        }

        function trustHTMLContent(content)
        {
            return $sce.trustAsHtml(content);
        }

        function addExercise(exercise)
        {
            exerciseService
                .createExercise(model.workoutId, exercise)
                .then(function (response) {
                    goBack();
                }, function (err) {
                    model.errorMessage = "Failed to add exercise to workout";
                });
        }

        function goBack()
        {
            $location
                .url("/profile/" + model.userId + "/workout/" + model.workoutId + "/exercise/");
        }
    }
})();