// eslint-disable-next-line no-unused-vars
import { Recipe} from '../components/Recipe.jsx'
// eslint-disable-next-line no-unused-vars
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeList} from '../components/RecipeList.jsx'
//import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import {Header} from '../components/Header.jsx'
import {RecipeSorting} from '../components/RecipeSorting.jsx'
import { useState } from 'react'

// eslint-disable-next-line no-unused-vars

export function RecipeHome() {

  const [author, setAuthor] = useState('')  
  const [sortBy, setSortBy] = useState('createdAt')  
  const [sortOrder, setSortOrder] = useState('descending')

  const postQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }], 
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  const recipes = postQuery.data || []

  return (
  <div> 
  <Header />
  <hr/>
  <RecipeSorting fields={['createdAt', 'title', 'likes']} 
  value={sortBy} 
  onChange={(value) => setSortBy(value)} 
  orderValue={sortOrder} 
  onOrderChange={(orderValue) => setSortOrder(orderValue)} />
    <hr/>
    <RecipeList recipes={recipes} />
    <hr/>
  <CreateRecipe /> </div>
  )
}
