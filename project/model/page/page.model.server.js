var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var websiteModel = require("../workout/workout.model.server");
var db = require("../models.server");

var pageModel = mongoose.model("WorkPageModel", pageSchema);
pageModel.createPage= createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
pageModel.findWidgets = findWidgets;
module.exports = pageModel;

function createPage(websiteId, page)
{
    page._website = websiteId;
    var temp = null;
    return pageModel
        .create(page)
        .then(function (page) {
            temp = page;
            return websiteModel.addPage(websiteId, temp._id);
        })
        .then(function (page) {
            return temp;
        });
}

function findAllPagesForWebsite(websiteId)
{
    return pageModel
        .find({_website: websiteId});
}

function findPageById(pageId)
{
    return pageModel
        .findById(pageId);
}

function updatePage(pageId, page)
{
    return pageModel
        .update(
        {
            _id: pageId
        },
        {
            $set: page
        }
    );
}

function deletePage(websiteId, pageId)
{
    return pageModel
        .findByIdAndRemove(pageId)
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        });
}

function addWidget(pageId, widgetId)
{
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId)
{
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function findWidgets(pageId)
{
    return pageModel
        .findById(pageId)
        .then(function (page) {
            return page.widgets;
        });
}