const {Schema, model} = require('mongoose');

const schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    size: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    weight: {
        type: Number,
        required: true,
    },
    comments: {
        type: [{
            productId: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                default: new Date().toISOString(),
            },
        }],
        default: [],
    },
});

module.exports = model('product', schema);
