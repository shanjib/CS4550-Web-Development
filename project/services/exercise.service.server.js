var app = require("../../express");
var exerciseModel = require("../model/exercise/exercise.model.server");

var multer = require('multer');

app.put("/api/workout/:workoutId/exercise", sortExercise);
app.post("/api/workout/:workoutId/exercise", createExercise);
app.get("/api/workout/:workoutId/exercise", findExercisesByWorkoutId);
app.get("/api/exercise/:exerciseId", findExerciseById);
app.put("/api/exercise/:exerciseId", updateExercise);
app.delete("/api/workout/:workoutId/exercise/:exerciseId", deleteExercise);

function sortExercise(req, res)
{
    var workoutId = req.params.workoutId;
    var initial = req.query.initial;
    var final = req.query.final;

    exerciseModel
        .reorderExercise(workoutId, initial, final)
        .then(function (status) {
            res.send(status);
        });
}

function createExercise(req, res)
{
    var workoutId = req.params.workoutId;
    var exercise = req.body;
    exerciseModel
        .createExercise(workoutId, exercise)
        .then(function (exercise) {
            res.json(exercise);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function findExercisesByWorkoutId(req, res)
{
    var workoutId = req.params.workoutId;
    exerciseModel
        .findAllExercisesForWorkout(workoutId)
        .then(function (exercises) {
            res.json(exercises);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function findExerciseById(req, res)
{
    var exerciseId = req.params.exerciseId;
    exerciseModel
        .findExerciseById(exerciseId)
        .then(function (exercise) {
            res.json(exercise);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateExercise(req, res)
{
    var exerciseId = req.params.exerciseId;
    var exercise = req.body;
    exerciseModel
        .updateExercise(exerciseId, exercise)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteExercise(req, res)
{
    var workoutId = req.params.workoutId;
    var exerciseId = req.params.exerciseId;
    exerciseModel
        .deleteExercise(workoutId, exerciseId)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
