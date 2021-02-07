import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../../store/actions/budgetActions'

class CreateAccount extends Component {
  state = {
    name: '',
    secondaryUsers: '',
    working_balance: ''
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
    // console.log('state', this.state)
    // console.log('props', this.props)
    // const { auth } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <form className="" onSubmit={this.handleSubmit}>
          <h5 className="">Create a New Account</h5>
          <div className="input-field">
            <input type="text" id='name' onChange={this.handleChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" id='working_balance' onChange={this.handleChange} />
            <label htmlFor="working_balance">Working Balance</label>
          </div>
          {/* TODO: add ability to create more than one secondaryuser. multiple text boxes. save as array */}
          <div className="input-field">
            <textarea id="secondaryUsers" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="secondaryUsers">Secondary User</label>
          </div>
          <div className="input-field">
            <button className="btn">Create Account</button>
          </div>
        </form>
      </div>
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