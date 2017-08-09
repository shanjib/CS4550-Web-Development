var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var userModel = require("../user/user.model.server");
var db = require("../models.server");

var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;
module.exports = websiteModel;

function createWebsiteForUser(userId, website)
{
    website._user = userId;
    var temp = null;
    return websiteModel
        .create(website)
        .then(function (website) {
            temp = website;
            return userModel.addWebsite(userId, temp._id);
        })
        .then(function (user) {
            return temp;
        });
}

function findAllWebsitesForUser(userId)
{
    return websiteModel
        .find({_user: userId});
}

function findWebsiteById(websiteId)
{
    return websiteModel
        .findById(websiteId);
}

function updateWebsite(websiteId, website)
{
    return websiteModel
        .update(
        {
            _id: websiteId
        },
        {
            $set: website
        }
    );
}

function deleteWebsite(userId, websiteId)
{
    return websiteModel
        .findByIdAndRemove(websiteId)
        .then(function (status) {
            return userModel.removeWebsite(userId, websiteId);
        });
}

function addPage(websiteId, pageId)
{
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId)
{
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}