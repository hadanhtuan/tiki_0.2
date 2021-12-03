const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    sorting: {
        type: Number
    }
})

const Page = mongoose.model('Page', PageSchema)
module.exports = Page

