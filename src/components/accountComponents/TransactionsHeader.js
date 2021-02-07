import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { createTransaction } from "../../store/actions/budgetActions";
import DatePicker from 'react-datepicker'
import { Component } from 'react';

class TransactionsHeader extends Component {
  state = {
    account: '',
    category: '',
    clear : false,
    date: '',
    inflow: '',
    memo: '',
    outflow: '',
    payee: '',
    showNewTransaction: false
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleShowNewTransaction = () =>{
    this.setState({
      showNewTransaction: !this.state.showNewTransaction
    })
  }
  iconClass = this.showNewTransaction ? faMinusCircle : faPlusCircle

  createNewTransaction = (e) => {
    createTransaction(this.state)
    this.setState({
      showNewTransaction: !this.showNewTransaction,
      account: '',
      category: '',
      clear : false,
      date: '',
      inflow: '',
      memo: '',
      outflow: '',
      payee: '',
    })
  }

  render(){
    const {accounts, budgetCats} = this.props
    console.log(accounts)
    console.log("budgetCats", budgetCats)
    const accountDropdown = accounts && accounts.length > 0 ?
      accounts.map((account) =>
        <option value={account.name}>{account.name}</option>
      )
    :
    <tr></tr>
    const categories = []
    for(let i = 0; i < budgetCats.length; i++){
      console.log('were inb!!!!!!!!!')
      categories.push(Object.keys(budgetCats[i].name))
    }
    console.log('categories', categories)
    const categoryDropdown = budgetCats && budgetCats.length > 0 ?
      budgetCats.map((category) =>
        <option value={category.name}>{category.name}</option>
      )
    :
    <tr></tr>

    return (
      <div>
        <tr>
          <td>
            <span style={{float:'left'}}>
              Add a New Transaction
              <FontAwesomeIcon icon={this.iconClass}
              style={{margin:'0px 10px'}} onClick={this.handleShowNewTransaction}
              />
            </span>
          </td>
        </tr>
        <tr className={this.state.showNewTransaction ? '':'hidden'}>
          <td colSpan ='7'>
            <select  id={'account'} value={this.state.account} onChange={this.handleChange} placeholder="Select Account">
              {accountDropdown}
            </select>
          </td>
          <td colSpan ='7'>
            <select  id={'category'} value={this.state.category} onChange={this.handleChange} placeholder="Select Category">
              {accountDropdown}
            </select>
          </td>
          <td colSpan ='7'>
            <label>
              Cleared
            </label>
            <input
                id={'clear'}
                name="clear"
                type="checkbox"
                checked={this.state.clear}
                onChange={this.handleChange} />
          </td>
          <td colSpan ='7'>
            <DatePicker id={'date'} name="date" selected={this.state.date} onChange={this.handleChange}/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"payee"} onChange={this.handleChange} placeholder="Payee"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"inflow"} onChange={this.handleChange} placeholder="Inflow"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"outflow"} onChange={this.handleChange} placeholder="Outflow"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"memo"} onChange={this.handleChange} placeholder="Memo"/>
            <FontAwesomeIcon icon={faCheck}
              className={this.showNewTransaction? '':'hidden'}
              style={{marginLeft:'8px'}} onClick={e=>{this.createNewTransaction(e)}}
            />
          </td>
        </tr>
      </div>
    )
  }
}
  const mapStateToProps = (state) => {
    console.log('state', state)
      return {
        transactions: state.firestore.ordered.transactions,
        accounts: state.firestore.ordered.accounts,
        budgetCats: state.budget.budget.categories
      }
  }

  const mapDispatchToProps = (dispatch) => {
      return{
        createTransaction: (transaction) => dispatch(createTransaction(transaction))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHeader)
