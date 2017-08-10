var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var widgetSchema = Schema(
    {
        _page: {type: Schema.Types.ObjectId, ref: "PageModel"},
        index: Number,
        widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "widget"
    }
);

module.exports = widgetSchema;
