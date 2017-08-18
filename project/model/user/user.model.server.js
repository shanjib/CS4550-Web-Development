var mongoose = require("mongoose");
var workUserSchema = require("./user.schema.server");
var db = require("../models.server");

var userModel = mongoose.model("WorkUserModel", workUserSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWorkout = addWorkout;
userModel.removeWorkout = removeWorkout;
module.exports = userModel;

function createUser(user)
{
    return userModel
        .create(user);
}

function findUserById(userId)
{
    return userModel
        .findById(userId);
}

function findUserByUsername(username)
{
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username, password)
{
    return userModel
        .findOne({username: username, password: password});
}

function updateUser(userId, user)
{
    return userModel
        .update(
        {
            _id: userId
        },
        {
            $set: user
        }
    );
}

function deleteUser(userId)
{
    return userModel.findByIdAndRemove(userId);
}

function addWorkout(userId, workoutId)
{
    return userModel
        .findById(userId)
        .then(function (user) {
            user.workouts.push(workoutId);
            return user.save();
        });
}

function removeWorkout(userId, workoutId)
{
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.workouts.indexOf(workoutId);
            user.workouts.splice(index, 1);
            return user.save();
        })
}