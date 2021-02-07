import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../store/actions/budgetActions'

class CreateTransaction extends Component {
  state = {
    account: '',
    // category: '',
    clear : false,
    // date: '', //TODO: replace with date object
    inflow: '',
    memo: '',
    outflow: '',
    payee: '',
    category:'Groceries',
    date:'2/19/21'
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createTransaction(this.state, 'Feb2021', 'Basics');
    this.props.history.push('/mainuserspecific');
    //TODO: Bug - once redirected to mainuserspecific, we lose access to props
  }
  render() {
    // console.log('state', this.state)
    // console.log('props', this.props)
    // const { auth } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="" onSubmit={this.handleSubmit}>
          <h5 className="">Create a New Transaction</h5>
          {/* TODO: Add date picker */}
          <div className="input-field">
            <input type="text" id='date' onChange={this.handleChange} />
            <label htmlFor="date">Date</label>
          </div>
          {/* TODO: Add drop down of all user accounts */}
          <div className="input-field">
            <input type="text" id='account' onChange={this.handleChange} />
            <label htmlFor="account">Account</label>
          </div>
          {/* TODO: Add drop down of all user categories */}
          <div className="input-field">
            <textarea id="category" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="category">Category</label>
          </div>
          <div className="input-field">
            <textarea id="payee" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="payee">Payee</label>
          </div>
          <div className="input-field">
            <textarea id="memo" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="memo">Memo</label>
          </div>
          {/* TODO:Add money format */}
          <div className="input-field">
            <textarea id="outflow" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="outflow">Outflow</label>
          </div>
          {/* TODO:Add money format */}
          <div className="input-field">
            <textarea id="inflow" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="inflow">Inflow</label>
          </div>
          {/* TODO: Add checkbox yes/no */}
          <div className="input-field">
            <textarea id="clear" className="materialize-textarea" onChange={this.handleChange}></textarea>
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
    createTransaction: (transaction, month, header) => dispatch(createTransaction(transaction, month, header))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)