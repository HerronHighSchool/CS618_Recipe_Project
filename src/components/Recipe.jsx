//protypes are for type checking
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'
import { createRecipe, updateRecipeLikes } from '../api/recipes.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import './ComponentStyle.css'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Recipe({ _id, title, contents, imageurl, author:userID, likes}) {
    
      const [token, setToken] = useAuth()
      const sub = token ? jwtDecode(token).sub : null  // Decode once here

      const queryClient = useQueryClient()
      const createRecipeLikes = useMutation({
        mutationFn: (updatedLikes) => updateRecipeLikes(token, _id, updatedLikes),
        onSuccess: () => queryClient.invalidateQueries(['recipes']),
      })

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log('=== DEBUG START ===')
            console.log('Token:', token)
            console.log('User ID:', sub)
            console.log('Recipe ID (_id):', _id)
            console.log('Current likes:', likes)
            const currentUserID = sub
            const updatedLikes = [...(likes || []), currentUserID]
            console.log('Updated likes array:', updatedLikes)
            console.log('=== DEBUG END ===')
            createRecipeLikes.mutate(updatedLikes)
        }

        const handleUnfavorite = (e) => {
            e.preventDefault()
            const currentUserID = sub
            const updatedLikes = likes.filter(id => id !== currentUserID)
            createRecipeLikes.mutate(updatedLikes)
        }

        /*If the user is loggin in and has already liked the recipe */
        if(token && likes?.includes(sub)){
            return(
            <article className="recipe-container">
                <div className = "recipe-header">
                <h3 className="recipe-title steps">{title}</h3></div>
                <h3>The Steps</h3>
                <div className="steps">{contents}</div>
                <br />
                <div className="center"><img className='imageStyle' src={imageurl} alt={title}></img></div>
                <div>{likes?.length || "Zero"} {likes?.length === 1 ? 'person' : 'people'} favorited this recipe.</div>
                
                <input type="submit" value="Unfavorite" onClick={handleUnfavorite}></input>
                 {userID && (
                 <em className="steps">
                     <br />
                    Written by <strong><User id={userID}/></strong>
                </em>
              )}
        </article>
        )
      }
      /**if the user is logged in, but hasn't like already */
        else if(token){
        return(
        <article className="recipe-container">
            <div className = "recipe-header">
            <h3 className="recipe-title steps">{title}</h3></div>
            <h3>The Steps</h3>
            <div className="steps">{contents}</div>
            <br />
            <div className="center"><img className='imageStyle' src={imageurl} alt={title}></img></div>
            <div>{likes?.length || "Zero"} {likes?.length === 1 ? 'person' : 'people'} favorited this recipe.</div>
            
            <input type="submit" value="Favorite" onClick={handleSubmit}></input>
            {userID && (
                <em className="steps">
                    <br />
                    Written by <strong><User id={userID}/></strong>
                </em>
            )}
        </article>
        )
        /**if the user is not logged in */
    }else{
        return(
        <article className="recipe-container">
            <div className = "recipe-header">
            <h3 className="recipe-title steps">{title}</h3></div>
            <h3>The Steps</h3>
            <div className="steps">{contents}</div>
            <br />
            <div className="center"><img className='imageStyle' src={imageurl} alt={title}></img></div>
            <div>{likes?.length || "Zero"} {likes?.length === 1 ? 'person' : 'people'} favorited this recipe.</div>
            {userID && (
                <em className="steps">
                    <br />
                    Written by <strong><User id={userID}/></strong>
                </em>
            )}
        </article>
        )
    }

}

Recipe.propTypes = { 
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    contents: PropTypes.string, 
    imageurl: PropTypes.string,
    author: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
}