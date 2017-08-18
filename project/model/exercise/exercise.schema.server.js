var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var exerciseSchema = Schema(
    {
        _workout: {type: Schema.Types.ObjectId, ref: "WorkoutModel"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "exercise"
    }
);

module.exports = exerciseSchema;
