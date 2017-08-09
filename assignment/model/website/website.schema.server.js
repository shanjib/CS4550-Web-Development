var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var websiteSchema = Schema(
    {
        _user: {type: Schema.Types.ObjectId, ref: "UserModel"},
        name: String,
        description: String,
        pages: [{type: Schema.Types.ObjectId, ref: "PageModel"}],
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "website"
    }
);

module.exports = websiteSchema;
