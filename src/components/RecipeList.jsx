// eslint-disable-next-line no-unused-vars
import { Fragment } from 'react' 
import PropTypes from 'prop-types' 
import { Recipe } from './Recipe.jsx'
import './ComponentStyle.css'
export function RecipeList({ recipes }) {

    return (
    <div>
        <div className = "title-header">
            <h2>Look at what we got cookin'</h2>
        </div>
        {recipes.map((recipe) => (
            <Recipe {...recipe} key={recipe._id} />
        ))}
    </div>
  )
}

RecipeList.propTypes = { 
    recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired, 
}