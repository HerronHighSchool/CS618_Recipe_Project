import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import "./ComponentStyle.css"

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div className = "title-header">
        <h2>Recipes 4 Everyone!</h2>
        Logged in as <User id={sub} />
        <br />
        <button class="logout" onClick={() => setToken(null)}>Logout</button>
      </div>
    )
  }

  return (
    <div className = "title-header">
      <h2>Recipes 4 Everyone!</h2>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </div>
  )
}