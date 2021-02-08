import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { createTransaction } from "../../store/actions/budgetActions";
import DatePicker from 'react-datepicker'
import { Component } from 'react';
var dayjs = require('dayjs')

class AddTransaction extends Component {
  budgetCats = this.props.budgetCats
  accounts = this.props.accounts



  state = {
    account: '',
    accountID: '',
    month:'',
    category: '',
    clear : false,
    date: '',
    header: '',
    inflow: '',
    memo: '',
    outflow: '',
    payee: '',
    showNewTransaction: false,
    header: '',
    primaryUser: 'qLbmoEQc8daBsJ8nasIeVM5uosF2'
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }

  handleDate = (e) => {
    this.setState({
      date: e,
      month: dayjs(e).format('MMMYYYY')
    });
  }
  findCat = (id, key) => {
    let cat = []
    for(let i = 0; i < this.catList.length; i++){
      if(Object.values(this.catList[i]).indexOf(id) >= 0){
        cat.push(this.catList[i])
      }
    }
    return cat[0][key]
  }
  findAcct = (id, key) => {
    let acct = []
    for(let i = 0; i < this.accounts.length; i++){
      if(this.accounts[i].id === id){
        acct.push(this.accounts[i])
      }
    }
    return acct[0][key]
  }
  handleCategory = (e) => {
    this.setState({
      category: this.findCat(parseInt(e.target.value), "name"),
      header: this.findCat(parseInt(e.target.value), "header")
    });
  }
  handleAccount = (e) => {
    this.setState({
      accountID: this.findAcct((e.target.value), "id"),
      account: this.findAcct((e.target.value), "name")
    });
  }
  handleShowNewTransaction = () =>{
    this.setState({
      showNewTransaction: !this.state.showNewTransaction
    })
  }
  iconClass = this.showNewTransaction ? faMinusCircle : faPlusCircle

  budgetCatsType = Object.keys(this.budgetCats)
  catList = []


  createNewTransaction = (e) => {
    e.preventDefault();
    console.log('add transaction')
    this.props.createTransaction(this.state)
    this.setState({
      account: '',
      accountID: '',
      month:'',
      category: '',
      clear : false,
      date: '',
      header: '',
      inflow: '',
      memo: '',
      outflow: '',
      payee: '',
      showNewTransaction: false,
      header: '',
      primaryUser: 'qLbmoEQc8daBsJ8nasIeVM5uosF2'
    })
  }

  render(){
    const {accounts, accountName} = this.props
    console.log(this.props)
    console.log(accounts)
    const accountDropdown = accounts && accounts.length > 0 ?
      accounts.map((account) =>
        <option value={account.id}>{account.name}</option>
      )
    :
    <tr></tr>

    for(let i = 0; i < this.budgetCatsType.length; i++){
      let iterator = this.budgetCats[this.budgetCatsType[i]].values()
      for (const value of iterator) {
        this.catList.push({
          header: this.budgetCatsType[i],
          name:value.name,
          id: this.catList.length + 1
        })
      }
    }
    const catsDropdown = this.catList && this.catList.length > 0 ?
      this.catList.map((cat) =>
        <option value={cat.id}>{cat.name}</option>
      )
    :
    <tr></tr>
    return (
      <div>
        <span style={{float:'left'}}>
          Add a New Transaction
          <FontAwesomeIcon icon={this.iconClass}
          style={{margin:'0px 10px'}} onClick={this.handleShowNewTransaction}
          />
        </span>
        <tr className={this.state.showNewTransaction ? '':'hidden'}>
          <td colSpan ='7'>
            <select  id={'account'} value={this.state.account} onChange={this.handleAccount} placeholder="Select Account">
            <option disabled={true} value="">Account</option>
              {accountDropdown}
            </select>
          </td>
          <td colSpan ='7'>
            <select  id={'category'} value={this.state.category} onChange={this.handleCategory} placeholder="Select Category">
              <option disabled={true} value="">Category</option>
              {catsDropdown}
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
            <DatePicker dateFormat="MM-dd-yyyy" name="date" value={this.state.date} selected={this.state.date} onChange={this.handleDate}/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"payee"} value={this.state.payee} onChange={this.handleChange} placeholder="Payee"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"inflow"} value={this.state.inflow} onChange={this.handleChange} placeholder="Inflow"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"outflow"} value={this.state.outflow} onChange={this.handleChange} placeholder="Outflow"/>
          </td>
          <td colSpan ='7'>
            <input type="text" id={"memo"} onChange={this.handleChange} value={this.state.memo} placeholder="Memo"/>
          </td>
        </tr>
        <tr className={this.state.showNewTransaction ? '':'hidden'}>
        <div className="input-field">
          <button className="" onClick={this.createNewTransaction}>Submit</button>
        </div>
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
        budgetCats: state.budget.budget.categories,
        auth: state.firebase.auth
      }
  }

  const mapDispatchToProps = (dispatch) => {
      return{
        createTransaction: (transaction) => dispatch(createTransaction(transaction))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
