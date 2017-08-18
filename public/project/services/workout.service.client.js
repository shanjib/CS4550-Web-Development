(function ()
{
    angular
        .module("WorkApp")
        .factory("workoutService", workoutService);

    function workoutService($http)
    {
        var api =
            {
                "createWorkout": createWorkout,
                "addWorkout": addWorkout,
                "findWorkoutsByUser": findWorkoutsByUser,
                "findWorkouts": findWorkouts,
                "findWorkoutById": findWorkoutById,
                "updateWorkout": updateWorkout,
                "deleteWorkout": deleteWorkout
            };
        return api;

        function createWorkout(userId, workout)
        {
            var url = "/api/user/" + userId + "/workout";
            return $http.post(url, workout);
        }

        function addWorkout(userId, workoutId)
        {
            var url = "/api/user/" + userId + "/workout/" + workoutId;
            return $http.put(url, {});
        }

        function findWorkouts()
        {
            var url = "/api/workout/";
            return $http.get(url);
        }

        function findWorkoutsByUser(userId)
        {
            var url = "/api/user/" + userId + "/workout";
            return $http.get(url);
        }

        function findWorkoutById(workoutId)
        {
            var url = "/api/workout/" + workoutId;
            return $http.get(url);
        }

        function updateWorkout(workoutId, workout)
        {
            var url = "/api/workout/" + workoutId;
            return $http.put(url, workout);
        }

        function deleteWorkout(userId, workoutId)
        {
            var url = "/api/user/" + userId + "/workout/" + workoutId;
            return $http.delete(url);
        }
    }
})();