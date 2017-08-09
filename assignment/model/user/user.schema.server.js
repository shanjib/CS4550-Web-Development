var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var userSchema = Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: Schema.Types.ObjectId, ref: "WebsiteModel"}],
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "user"
    }
);

module.exports = userSchema;