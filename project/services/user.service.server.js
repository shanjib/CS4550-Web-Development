var app = require("../../express");
var userModel = require("../model/user/user.model.server");

app.post("/api2/user", createUser);
app.get("/api2/user", findUser);
app.get("/api2/user/:userId", findUserById);
app.put("/api2/user/:userId", updateUser);
app.delete("/api2/user/:userId", deleteUser);

function createUser(req, res)
{
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res
                .json(user);
        }, function(err) {
            res
                .sendStatus(400)
                .send(err);
        });
}

function findUser(req, res)
{
    var username = req.query.username;
    var password = req.query.password;

    if (username && password)
    {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                res.sendStatus(404).send(err);
            });
    }
    else if (username)
    {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            })
    }
    else
    {
        res.sendStatus(404);
    }
}

function findUserById(req, res)
{
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateUser(req, res)
{
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteUser(req, res)
{
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
