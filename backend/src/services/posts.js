import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

 export async function createPost( userID, {title, contents, tags, likes}={}) { 
    const post = new Post({ title, author: userID, contents, tags, likes }) 
    return await post.save() 
}

async function listPosts( 
    query = {}, 
    { sortBy = 'createdAt', sortOrder = 'descending' } = {}, ) {
    return await Post.find(query).sort({ [sortBy]: sortOrder }) 
}

export async function listAllPosts(option){
    return await listPosts({}, option)
}

export async function listPostsByAuthor(authorUsername, option) {
    const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, option)
}

export async function listPostsByTag(tags, option) {
    return await listPosts({tags}, option) 
}

export async function getPostById(postId) {
    return await Post.findById(postId) 
}

export async function updatePost(userID, postId, { title, contents, tags, likes }={}) { 
    return await Post.findOneAndUpdate( { _id: postId, author:userID }, { $set: { title, contents, tags } },
        { new: true }, ) 
    }

export async function deletePost(userID, postId) { 
    return await Post.deleteOne({ _id: postId, author: userID }) 
}

