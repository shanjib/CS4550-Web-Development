var app = require("../../express");

var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/uploads' });

var widgets =
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

app.put("/api/page/:pageId/widget", sortWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function sortWidget(req, res)
{
    var initial = req.query.initial;
    var final = req.query.final;
    var temp = widgets[initial];
    widgets[initial] = widgets[final];
    widgets[final] = temp;
    res.sendStatus(200);
}

function uploadImage(req, res)
{
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    for (var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            widgets[w].url = "/uploads/" + filename;
        }
    }

    var callbackUrl   = "/assignment/#!/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    res.redirect(callbackUrl);
}

function createWidget(req, res)
{
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget);
}

function findWidgetsByPageId(req, res)
{
    var pageId = req.params.pageId;
    var pageWidgets = [];
    for (var w in widgets)
    {
        var _widget = widgets[w];
        if (_widget.pageId === pageId)
        {
            pageWidgets.push(_widget);
        }
    }
    res.send(pageWidgets);
}

function findWidgetById(req, res)
{
    var widgetId = req.params.widgetId;
    for (var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            res.send(widgets[w]);
        }
    }
    res.send("0");
}

function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for (var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            widgetId._id = widgetId;
            widgets[w] = widget;
            res.send(widget[w]);
        }
    }
    res.send("0");
}

function deleteWidget(req, res)
{
    var widgetId = req.params.widgetId;
    for (var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            delete widgets[w];
            res.send("0");
        }
    }
    res.send("0");
}
