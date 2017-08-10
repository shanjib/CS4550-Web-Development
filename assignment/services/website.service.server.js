var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesByUserId);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

function createWebsite(req, res)
{
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function findWebsitesByUserId(req, res)
{
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWebsiteById(req, res)
{
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateWebsite(req, res)
{
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteWebsite(req, res)
{
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
