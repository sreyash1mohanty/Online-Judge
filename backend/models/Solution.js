const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const solutionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    submissionTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});
module.exports = mongoose.model('Solution', solutionSchema);
