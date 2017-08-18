var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var workoutSchema = Schema(
    {
        _user: [{type: Schema.Types.ObjectId, ref: "UserModel"}],
        name: String,
        description: String,
        exercises: [{type: Schema.Types.ObjectId, ref: "ExerciseModel"}],
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "workout"
    }
);

module.exports = workoutSchema;
