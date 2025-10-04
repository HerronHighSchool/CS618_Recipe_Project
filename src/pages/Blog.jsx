// eslint-disable-next-line no-unused-vars
import { Post} from '../components/Post.jsx'
// eslint-disable-next-line no-unused-vars
import { CreatePost } from '../components/CreatePost.jsx'
import { PostList } from '../components/PostList.jsx'
//import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts.js'
import {Header} from '../components/Header.jsx'

// eslint-disable-next-line no-unused-vars

export function Blog() {
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  const posts2 = postQuery.data || []

  return (
  <div> 
  <Header />
  <hr/>
    <PostList posts={posts2} />
    <hr/>
  <CreatePost /> </div>
  )
}
