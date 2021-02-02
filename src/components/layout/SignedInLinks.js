import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/userActions'

const SignedInLinks = ({signOut}) => {
    return (
       <ul className="right">
           <li className="right"><a onClick={signOut}>Log Out</a></li>
       </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignedInLinks)