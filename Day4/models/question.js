const mongosee = require('mongoose');
const { Schema } = mongosee;

const questionSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    yesCount: {
        type: Number,
        default: 0
    },
    noCount: {
        type:Number,
        default: 0
    }
})

const questionModel = mongosee.model('question', questionSchema);

module.exports = questionModel;