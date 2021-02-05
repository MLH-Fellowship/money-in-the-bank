import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = ({auth}) => {
    const {uid, email} = auth;

    const links = uid ? <SignedInLinks/> : <SignedOutLinks/>
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            {links}
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)