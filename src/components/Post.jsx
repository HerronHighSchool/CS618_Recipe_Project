//protypes are for type checking
import PropTypes from 'prop-types'
import { User } from './User.jsx'
import './ComponentStyle.css'
export function Post({ title, contents, author:userID }) {
    return(
        <article>
            <h3>{title}</h3>
            <div>Da Ingredients:{contents}</div>
            <div>Image Link Here</div>
            {userID && (
                <em>
                    <br />
                    Written by <strong><User id={userID}/></strong>
                </em>
            )}
        </article>
    )
}

Post.propTypes = { 
    title: PropTypes.string.isRequired, 
    contents: PropTypes.string, 
    author: PropTypes.string,
}