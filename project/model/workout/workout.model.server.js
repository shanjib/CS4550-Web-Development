var mongoose = require("mongoose");
var workoutSchema = require("./workout.schema.server");
var userModel = require("../user/user.model.server");
var db = require("../models.server");

var workoutModel = mongoose.model("WorkoutModel", workoutSchema);
workoutModel.createWorkoutForUser = createWorkoutForUser;
workoutModel.addWorkoutForUser = addWorkoutForUser;
workoutModel.findAllWorkoutsForUser = findAllWorkoutsForUser;
workoutModel.findAllWorkouts = findAllWorkouts;
workoutModel.findWorkoutById = findWorkoutById;
workoutModel.updateWorkout = updateWorkout;
workoutModel.deleteWorkout = deleteWorkout;
workoutModel.addExercise = addExercise;
workoutModel.removeExercise = removeExercise;
module.exports = workoutModel;

function createWorkoutForUser(userId, workout)
{
    workout._user = [userId];
    var temp = null;
    return workoutModel
        .create(workout)
        .then(function (workout) {
            temp = workout;
            return userModel.addWorkout(userId, temp._id);
        })
        .then(function (user) {
            return temp;
        });
}

function addWorkoutForUser(userId, workoutId)
{
    return workoutModel
        .findById(workoutId)
        .then(function (workout) {
            workout._user.push(userId);
            return workout.save();
        })
        .then(function (response) {
            return userModel
                .findById(userId);
        })
        .then(function (user) {
            user.workouts.push(workoutId);
            return user.save();
        })
}

function findAllWorkouts()
{
    return workoutModel
        .find();
}

function findAllWorkoutsForUser(userId)
{
    return userModel
        .findById(userId)
        .populate('workouts')
        .exec()
        .then(function (user) {
            return user.workouts;
        })
}

function findWorkoutById(workoutId)
{
    return workoutModel
        .findById(workoutId);
}

function updateWorkout(workoutId, workout)
{
    return workoutModel
        .update(
        {
            _id: workoutId
        },
        {
            $set: workout
        }
    );
}

function deleteWorkout(userId, workoutId)
{
    return workoutModel
        .findByIdAndRemove(workoutId)
        .then(function (status) {
            return userModel.removeWorkout(userId, workoutId);
        });
}

function addExercise(workoutId, exerciseId)
{
    return workoutModel
        .findById(workoutId)
        .then(function (workout) {
            workout.exercises.push(exerciseId);
            return workout.save();
        });
}

function removeExercise(workoutId, exerciseId)
{
    return workoutModel
        .findById(workoutId)
        .then(function (workout) {
            var index = workout.exercises.indexOf(exerciseId);
            workout.exercises.splice(index, 1);
            return workout.save();
        })
}