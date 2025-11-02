import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String, 
    imageurl: String, 
    tags: [String],
    likes: [String],
}, { timestamps: true })

export const Recipe = mongoose.model('Recipe', recipeSchema)