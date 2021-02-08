import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../../store/actions/budgetActions'

class CreateAccount extends Component {
  state = {
    name: '',
    primaryUser: this.props && this.props.auth.uid,
    secondaryUsers: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAccount(this.state);
    this.props.history.push('/');
  }

  render() {
    const auth = this.props && this.props.auth.uid;
    console.log(this.state)
    return (
      <>
        <h2 className="section-title paddingTop">Create a New Account</h2>
        <form className="account-creation-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' onChange={this.handleChange} />
          <label htmlFor="working_balance">Working Balance</label>
          <input type="text" id='working_balance' onChange={this.handleChange} />
          <label htmlFor="secondaryUsers">Secondary User</label>
          <textarea id="secondaryUsers" className="" onChange={this.handleChange}></textarea>
          <button className="budget-button form-button">Create Account</button>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAccount: (account) => dispatch(createAccount(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)