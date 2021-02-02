import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createUser,signIn} from '../store/actions/userActions'
import {Redirect, Link} from 'react-router-dom'

class SignUp extends Component {
    state={
        email:'',
        password:'',
        confirmPassword:'',
        logIn:false
    }

    onChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.createUser({
            email:this.state.email,
            name: this.state.name,
            password: this.state.password
        })
    }

    logIn=()=>{
        this.setState({logIn:true})
    }

    render() {
        const {authError, auth} = this.props
        if(auth.uid) return <Redirect to='/'/>
        if(this.state.logIn) return <Redirect to='/login'/>

        return (
            <main className="auth-form-container">
                <form  className="auth-form-box" onSubmit ={this.onSubmit}>
                    <h1>Sign Up</h1>
                    <input type="text" id="name" onChange={this.onChange} required placeholder="Name"/>
                    <br/>
                    <input type="email" id="email" onChange={this.onChange} required placeholder="Email"/>
                    <br/>
                    <input type="password" id="password" minLength={6} required onChange={this.onChange} placeholder="Password"/>
                    <br/>
                    <input type="password" id="confirmPassword" minLength={6} required onChange={this.onChange} placeholder="Confirm Password"/>
                    <br/>
                    <button>Sign Up</button>
                    {authError ? <p>{authError.message}</p>:null }
                <article className='auth-form-redirect'>
                    <p>Already a user?</p>
                    <Link to='/login'>Log In</Link>
                </article>
                </form>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {  
    return {
        createUser: (user) => dispatch(createUser(user)),
        signIn: (user) => dispatch(signIn(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)