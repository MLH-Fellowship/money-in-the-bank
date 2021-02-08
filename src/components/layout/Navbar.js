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
            <NavLink to="/"><span className="home-link">Home</span></NavLink>
            {links}
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)