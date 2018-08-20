const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        trackId: {
            type: String
        },
        trackType: {
            type: String
        },
        weight: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        travell: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

// что бы избавиться от подчёркивания _id (не работает)
schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Product', schema);
