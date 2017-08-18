var app = require("../../express");
var workoutModel = require("../model/workout/workout.model.server");

app.post("/api/user/:userId/workout", createWorkout);
app.put("/api/user/:userId/workout/:workoutId", addWorkout);
app.get("/api/user/:userId/workout", findWorkoutsByUserId);
app.get("/api/workout/:workoutId", findWorkoutById);
app.get("/api/workout", findWorkouts);
app.put("/api/workout/:workoutId", updateWorkout);
app.delete("/api/user/:userId/workout/:workoutId", deleteWorkout);

function createWorkout(req, res)
{
    var workout = req.body;
    var userId = req.params.userId;
    workoutModel
        .createWorkoutForUser(userId, workout)
        .then(function (workout) {
            res.json(workout);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function addWorkout(req, res)
{
    var workoutId = req.params.workoutId;
    var userId = req.params.userId;
    workoutModel
        .addWorkoutForUser(userId, workoutId)
        .then(function (workout) {
            res.json(workout);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function findWorkouts(req, res)
{
    workoutModel
        .findAllWorkouts()
        .then(function (workouts) {
            res.json(workouts);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWorkoutsByUserId(req, res)
{
    var userId = req.params.userId;
    workoutModel
        .findAllWorkoutsForUser(userId)
        .then(function (workouts) {
            res.json(workouts);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWorkoutById(req, res)
{
    var workoutId = req.params.workoutId;
    workoutModel
        .findWorkoutById(workoutId)
        .then(function (workout) {
            res.json(workout);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateWorkout(req, res)
{
    var workoutId = req.params.workoutId;
    var workout = req.body;
    workoutModel
        .updateWorkout(workoutId, workout)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteWorkout(req, res)
{
    var userId = req.params.userId;
    var workoutId = req.params.workoutId;
    workoutModel
        .deleteWorkout(userId, workoutId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
