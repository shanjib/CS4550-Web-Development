var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");

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
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);

function sortWidget(req, res)
{
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.send(status);
        });
}

function uploadImage(req, res)
{
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var filename = myFile.filename;
    var size = myFile.size;
    var _widget;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            _widget = widget;
            _widget.url = "/uploads/" + filename;
            _widget.size = size;
            _widget.width = width;
            return widgetModel.updateWidget(widgetId, _widget);
        }, function (err) {
            res.sendStatus(400).send(err);
        })
        .then(function (status) {
            var callbackUrl   = "/assignment/#!/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
            res.redirect(callbackUrl);
        }, function (err) {
            res.sendStatus(505).send(err);
        });

}

function createWidget(req, res)
{
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function findWidgetsByPageId(req, res)
{
    var pageId = req.params.pageId;
    var pageWidgets = [];
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function findWidgetById(req, res)
{
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteWidget(req, res)
{
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
