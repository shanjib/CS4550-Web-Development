var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var pageSchema = Schema(
    {
        _website: {type: Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "page"
    }
);

module.exports = pageSchema;
