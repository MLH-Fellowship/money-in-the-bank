import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
       <ul>
           <li className="right"><NavLink to="/signup">Sign Up</NavLink></li>
           <li className="right"><NavLink to="/login">Log In</NavLink></li>
       </ul>
    )
}

export default SignedOutLinks