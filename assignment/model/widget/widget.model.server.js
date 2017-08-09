var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageModel = require("../page/page.model.server");
var db = require("../models.server");

var widgetModel = mongoose.model("WidgetModel", widgetSchema);
widgetModel.createWidget= createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(pageId, widget)
{
    widget._page = pageId;
    var temp = null;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            temp = widget;
            return pageModel.addWidget(pageId, temp._id);
        })
        .then(function (status) {
            return temp;
        });
}

function findAllWidgetsForPage(pageId)
{
    return pageModel
        .findById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        });
}

function findWidgetById(widgetId)
{
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget)
{
    return widgetModel
        .update(
        {
            _id: widgetId
        },
        {
            $set: widget
        }
    );
}

function deleteWidget(pageId, widgetId)
{
    return widgetModel
        .findByIdAndRemove(widgetId)
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, initial, final)
{
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var start = page.widgets[initial];
            var end = page.widgets[final];
            page.widgets.set(initial, end);
            page.widgets.set(final, start);
            return page.save();
        });
}