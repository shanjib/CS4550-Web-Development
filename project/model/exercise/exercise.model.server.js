var mongoose = require("mongoose");
var exerciseSchema = require("./exercise.schema.server");
var workoutModel = require("../workout/workout.model.server");
var db = require("../models.server");

var exerciseModel = mongoose.model("WorkExerciseModel", exerciseSchema);
exerciseModel.createExercise= createExercise;
exerciseModel.findAllExercisesForWorkout = findAllExercisesForWorkout;
exerciseModel.findExerciseById = findExerciseById;
exerciseModel.updateExercise = updateExercise;
exerciseModel.deleteExercise = deleteExercise;
exerciseModel.reorderExercise = reorderExercise;
module.exports = exerciseModel;

function createExercise(workoutId, exercise)
{
    exercise._workout = workoutId;
    var temp = null;
    return exerciseModel
        .create(exercise)
        .then(function (exercise) {
            temp = exercise;
            return workoutModel.addExercise(workoutId, temp._id);
        })
        .then(function (status) {
            return temp;
        });
}

function findAllExercisesForWorkout(workoutId)
{
    return exerciseModel
        .find({_workout:workoutId});
}

function findExerciseById(exerciseId)
{
    return exerciseModel
        .findById(exerciseId);
}

function updateExercise(exerciseId, exercise)
{
    return exerciseModel
        .update(
        {
            _id: exerciseId
        },
        {
            $set: exercise
        }
    );
}

function deleteExercise(workoutId, exerciseId)
{
    return exerciseModel
        .findByIdAndRemove(exerciseId)
        .then(function (status) {
            return workoutModel.removeExercise(workoutId, exerciseId);
        });
}

function reorderExercise(workoutId, initial, final)
{
    return workoutModel
        .findWorkoutById(workoutId)
        .then(function (workout) {
            var start = workout.exercises[initial];
            var end = workout.exercises[final];
            workout.exercises.set(initial, end);
            workout.exercises.set(final, start);
            return workout.save();
        });
}