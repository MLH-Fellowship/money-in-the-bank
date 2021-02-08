import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
       <ul className="utility-links">
           <li className="right"><NavLink to="/signup"><span>Sign Up</span></NavLink></li>
           <li className="right"><NavLink to="/login"><span>Log In</span></NavLink></li>
       </ul>
    )
}

export default SignedOutLinks