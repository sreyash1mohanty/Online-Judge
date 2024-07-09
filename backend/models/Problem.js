const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testCaseSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});
const problemSchema = new Schema({
    problem_name: {
        type: String,
        required: true
    },
    problem_statement: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testCases: [testCaseSchema],
    default:[],
});
module.exports = mongoose.model("Problem", problemSchema);
