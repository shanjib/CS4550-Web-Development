var app = require("../../express");

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res)
{
    var websiteId = req.params.websiteId;
    var page = req.body;

    page._id = (new Date).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);

    res.send(page);
}

function findPagesByWebsiteId(req, res)
{
    var websiteId = req.params.websiteId;
    var websitePages = [];
    for (var p in pages)
    {
        var _page = pages[p];
        if (_page.websiteId === websiteId)
        {
            websitePages.push(_page);
        }
    }
    res.send(websitePages);
}

function findPageById(req, res)
{
    var pageId = req.params.pageId;
    for (var p in pages)
    {
        if (pages[p]._id === pageId)
        {
            res.send(pages[p]);
        }
    }
    res.send("0");
}

function updatePage(req, res)
{
    var pageId = req.params.pageId;
    var page = req.body;

    for (var p in pages)
    {
        if (pages[p]._id === pageId)
        {
            page._id = pageId;
            pages[p] = page;
            res.send(page);
        }
    }
}

function deletePage(req, res)
{
    var pageId = req.params.pageId;
    for (var p in pages)
    {
        if (pages[p]._id === pageId)
        {
            delete pages[p];
            res.send("0");
        }
    }
    res.send("0");
}
