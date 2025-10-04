import { Recipe}  from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

 export async function createRecipe( userID, {title, contents, imageurl, tags}={}) { 
    const post = new Recipe({ title, author: userID, contents, imageurl, tags }) 
    return await post.save() 
}

async function listRecipes( 
    query = {}, 
    { sortBy = 'createdAt', sortOrder = 'descending' } = {}, ) {
    return await Recipe.find(query).sort({ [sortBy]: sortOrder }) 
}

export async function listAllRecipes(option){
    return await listRecipes({}, option)
}

export async function listRecipesByAuthor(authorUsername, option) {
    const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, option)
}

export async function listRecipesByTag(tags, option) {
    return await listRecipes({tags}, option) 
}

export async function getRecipeById(postId) {
    return await Recipe.findById(postId) 
}

export async function updateRecipe(userID, postId, { title, contents, imageurl, tags }={}) { 
    return await Recipe.findOneAndUpdate( { _id: postId, author:userID }, { $set: { title, contents, imageurl, tags } },
        { new: true }, ) 
    }

export async function deleteRecipe(userID, postId) { 
    return await Recipe.deleteOne({ _id: postId, author: userID }) 
}