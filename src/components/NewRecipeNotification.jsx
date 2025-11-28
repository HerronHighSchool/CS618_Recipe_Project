import PropTypes from 'prop-types'
import { User } from './User.jsx'
import './ComponentStyle.css'
import {toast } from 'react-toastify';


export function NewRecipeNotification({ author, title, recipeID }) {  
return toast(
 <p><Link to={`/recipes/${recipeID}`}>New Recipe Created: {title} by <User id={author} /></Link ></p>);
}

NewRecipeNotification.propTypes = { 
    author: PropTypes.string,
    title: PropTypes.string.isRequired, 
    recipeID: PropTypes.string.isRequired,
}