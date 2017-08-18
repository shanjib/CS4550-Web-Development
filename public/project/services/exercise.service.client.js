(function ()
{
    angular
        .module("WorkApp")
        .factory("exerciseService", exerciseService);

    function exerciseService($http)
    {
        var api =
            {
                "createExercise": createExercise,
                "findExercisesByWorkoutId": findExercisesByWorkoutId,
                "findExerciseById": findExerciseById,
                "updateExercise": updateExercise,
                "deleteExercise": deleteExercise
            };
        return api;

        function createExercise(workoutId, exercise)
        {
            var url = "/api/workout/" + workoutId + "/exercise";
            return $http.post(url, exercise);
        }

        function findExercisesByWorkoutId(workoutId)
        {
            var url = "/api/workout/" + workoutId + "/exercise";
            return $http.get(url);
        }

        function findExerciseById(exerciseId)
        {
            var url = "/api/exercise/" + exerciseId;
            return $http.get(url);
        }

        function updateExercise(exerciseId, exercise)
        {
            var url = "/api/exercise/" + exerciseId;
            return $http.put(url, exercise);
        }

        function deleteExercise(workoutId, exerciseId)
        {
            var url = "/api/workout/" + workoutId + "/exercise/" + exerciseId;
            return $http.delete(url);
        }
    }
})();
