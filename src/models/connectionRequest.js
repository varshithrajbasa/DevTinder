const {mongoose} = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: '{VALUE} is not a supported status.'
        },
        required: true
    }
}, {
    timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre('save', function(next) {
    if (this.fromUserId.equals(this.toUserId)) {
        return next(new Error("Cannot send a connection request to yourself."));
    }
});

const ConnectionRequest = mongoose.model("Connection_Request", connectionRequestSchema);
module.exports = ConnectionRequest;