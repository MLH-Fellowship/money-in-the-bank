import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../store/actions/budgetActions'

class CreateTransaction extends Component {
  state = {
    account: '',
    category: '',
    clear : false,
    date: '',
    inflow: '',
    memo: '',
    outflow: '',
    payee: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createTransaction(this.state);
    this.props.history.push('/');
    //TODO: Bug - once redirected to mainuserspecific, we lose access to props
  }

  render() {
    return (
      <div className="container">
        <form className="" onSubmit={this.handleSubmit}>
          <h5 className="">Create a New Transaction</h5>
          {/* TODO: Add date picker */}
          <div className="input-field">

          </div>
          {/* TODO: Add drop down of all user accounts */}
          <div className="input-field">
            <input type="text" id='account' onChange={this.handleChange} />
            <label htmlFor="account">Account</label>
          </div>
          {/* TODO: Add drop down of all user categories */}
          <div className="input-field">
            <textarea id="category" onChange={this.handleChange}></textarea>
            <label htmlFor="category">Category</label>
          </div>
          <div className="input-field">
            <textarea id="payee" onChange={this.handleChange}></textarea>
            <label htmlFor="payee">Payee</label>
          </div>
          <div className="input-field">
            <textarea id="memo" onChange={this.handleChange}></textarea>
            <label htmlFor="memo">Memo</label>
          </div>
          {/* TODO:Add money format */}
          <div className="input-field">
            <textarea id="outflow" onChange={this.handleChange}></textarea>
            <label htmlFor="outflow">Outflow</label>
          </div>
          {/* TODO:Add money format */}
          <div className="input-field">
            <textarea id="inflow" onChange={this.handleChange}></textarea>
            <label htmlFor="inflow">Inflow</label>
          </div>
          {/* TODO: Add checkbox yes/no */}
          <div className="input-field">
            <textarea id="clear" onChange={this.handleChange}></textarea>
            <label htmlFor="clear">Clear</label>
          </div>
          <div className="input-field">
            <button className="btn">Create Transaction</button>
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
    createTransaction: (transaction) => dispatch(createTransaction(transaction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)