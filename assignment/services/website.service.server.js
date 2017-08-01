var app = require("../../express");

var websites =
    [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];


app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesByUserId);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

function createWebsite(req, res)
{
    var website = req.body;
    var userId = req.params.userId;

    website._id = (new Date).getTime() + "";
    website.developerId = userId;
    websites.push(website);

    res.send(website);
}

function findWebsitesByUserId(req, res)
{
    var userId = req.params.userId;
    var userWebsites = [];
    for (var w in websites)
    {
        var _website = websites[w];
        if (_website.developerId === userId)
        {
            userWebsites.push(_website);
        }
    }
    res.send(userWebsites);
}

function findWebsiteById(req, res)
{
    var websiteId = req.params.websiteId;
    for (var w in websites)
    {
        if (websites[w]._id === websiteId)
        {
            res.send(websites[w]);
        }
    }
    res.send("0");
}

function updateWebsite(req, res)
{
    var websiteId = req.params.websiteId;
    var website = req.body;

    for (var w in websites)
    {
        if (websites[w]._id === websiteId)
        {
            website._id = websiteId;
            websites[w] = website;
            res.send(websites[w]);
        }
    }
    res.send("0");
}

function deleteWebsite(req, res)
{
    var websiteId = req.params.websiteId;
    for (var w in websites)
    {
        if (websites[w]._id === websiteId)
        {
            delete websites[w];
            res.send("0");
        }
    }
    res.send("0");
}
