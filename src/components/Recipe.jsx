//protypes are for type checking
import PropTypes from 'prop-types'
import { User } from './User.jsx'
import './ComponentStyle.css'

export function Recipe({ title, contents, imageurl, author:userID}) {
    return(
        <article className="recipe-container">
            <div className = "recipe-header">
            <h3 className="recipe-title steps">{title}</h3></div>
            <h3>The Steps</h3>
            <div className="steps">{contents}</div>
            <br />
            <div className="center"><img className='imageStyle' src={imageurl} alt={title}></img></div>
             <div>Three people favorited this recipe.</div>
            <input type="submit" value="Favorite"></input>
            {userID && (
                <em className="steps">
                    <br />
                    Written by <strong><User id={userID}/></strong>
                </em>
            )}
        </article>
    )
}

Recipe.propTypes = { 
    title: PropTypes.string.isRequired, 
    contents: PropTypes.string, 
    imageurl: PropTypes.string,
    author: PropTypes.string,
}