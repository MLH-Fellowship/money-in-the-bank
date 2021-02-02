import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn, updateUser} from '../store/actions/userActions'
import {Redirect, Link} from 'react-router-dom'
class SignIn extends Component {
    state={
        email:'',
        password:'',
        signUp:false
    }

    onChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state)
        this.props.signIn(this.state)
    }

    signUp=()=>{
        this.setState({signUp:true})
    }

    resetPassword=()=>{
        this.props.updateUser()
    }

    render() {
        const {authError, auth} = this.props
        if(auth.uid) return <Redirect to='/'/>
        if(this.state.signUp) return <Redirect to='/signup'/>
        
        return (
            <main className="auth-form-container">
                <form  className="auth-form-box" onSubmit ={this.onSubmit}>
                    <h1>Log In</h1>
                    <input type="email" id="email" onChange={this.onChange} required placeholder="Email"/>
                    <br/>
                    <input type="password" id="password" minLength={6} required onChange={this.onChange} placeholder="Password"/>
                    <br/>
                    <button>Log In</button>
                    {authError ? <p>{authError.message}</p>:null }
                    <article className='forgot-password'>
                        <p >Forgot password?</p>
                        <Link to='/forgotpassword' className='redirect-link'>Reset</Link>
                    </article>
                    <article className='auth-form-redirect'>
                        <p>New user?</p>
                        <Link to='/signup'>Sign Up</Link>
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
        signIn: (creds) => dispatch(signIn(creds)),
        updateUser: (user) => dispatch(updateUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)