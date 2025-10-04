// eslint-disable-next-line no-unused-vars
import { Recipe} from '../components/Recipe.jsx'
// eslint-disable-next-line no-unused-vars
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeList} from '../components/RecipeList.jsx'
//import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import {Header} from '../components/Header.jsx'

// eslint-disable-next-line no-unused-vars

export function RecipeHome() {
  const postQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  const recipes = postQuery.data || []

  return (
  <div> 
  <Header />
  <hr/>
    <RecipeList recipes={recipes} />
    <hr/>
  <CreateRecipe /> </div>
  )
}
