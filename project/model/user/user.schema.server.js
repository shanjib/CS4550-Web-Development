var mongoose = require("mongoose")
    ,Schema = mongoose.Schema;

var workUserSchema = Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        workouts: [{type: Schema.Types.ObjectId, ref: "WorkoutModel"}],
        role: {type: String, enum: ["Regular", "Trainer", "Leader"], default: "Regular"},
        dateCreated: {type: Date, default: Date.now}
    },
    {
        collection: "workoutUser"
    }
);

module.exports = workUserSchema;