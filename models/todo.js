const mongoose = require('mongoose')


const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completed_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Todo', todoSchema, 'myCustomCollectionName')
