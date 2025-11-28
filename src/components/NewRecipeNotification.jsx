import PropTypes from 'prop-types'
import { User } from './User.jsx'
import './ComponentStyle.css'
import {toast } from 'react-toastify';


export function NewRecipeNotification({ author, title }) {  
return toast(
 <p>New Recipe Created: {title} by <User id={author} /></p>);
}

NewRecipeNotification.propTypes = { 
    author: PropTypes.string,
    title: PropTypes.string.isRequired, 
}