import { initDB } from './db/initdb.js' 
import { Recipe } from './db/models/recipe.js'

await initDB()

/*const recipe = new Recipe({ 
    title: 'Samosas', 
    author: 'Baron', 
    contents: 'The steps of making samosas will go here', 
    imageurl: 'https://therecipe.website/wp-content/uploads/2024/02/Vegetable-Samosas-350x250.jpg',
    tags: ['samosas', 'indian'], })

await recipe.save()*/

const recipes = await Recipe.find() 
console.log(recipes)