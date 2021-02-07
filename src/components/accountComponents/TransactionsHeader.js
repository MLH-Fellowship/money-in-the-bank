import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { createTransaction } from "../../store/actions/budgetActions";

const TransactionsHeader = () => {
  const [state, setState] = useState({ account: '', category: '', clear: '' , date: '', inflow:'', memo: '', outflow: '', payee: '' });
  const [newTransaction, setNewTransaction] = useState('')

  const [showNewTransaction, setShowNewTransaction] = useState(false)
  const iconClass = showNewTransaction ? faMinusCircle : faPlusCircle

  const onChange = (e) => {
    setNewTransaction(e.target.value);
  }

  const toggleShowNewTransaction = (e) => {
    setShowNewTransaction(!showNewTransaction)
  }

  const createNewTransaction = (e) => {
    setNewTransaction(state => ({...state, account: e.account, category: e.category, clear: e.clear , date: e.date, inflow: e.inflow, memo: e.memo, outflow: e.outflow, payee: e.payee}))
    createTransaction(this.state)
    setShowNewTransaction(!showNewTransaction)
    setState({ account: '', category: '', clear: '' , date: '', inflow:'', memo: '', outflow: '', payee: '' })
  }

  return (
    <div>
      <tr>
        <td>
          <span style={{float:'left'}}>
            Add a New Transaction
            <FontAwesomeIcon icon={iconClass}
            style={{margin:'0px 10px'}} onClick={e=>toggleShowNewTransaction(e)}
            />
          </span>
        </td>
      </tr>
      <tr className={showNewTransaction ? '':'hidden'}>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
        </td>
        <td colSpan ='7'>
          <input type="text" id={"account"} onChange={e => onChange(e)} placeholder="Account" value={""}/>
          <FontAwesomeIcon icon={faCheck}
            className={showNewTransaction && newTransaction.length == 8 ? '':'hidden'}
            style={{marginLeft:'8px'}} onClick={e=>{createNewTransaction(e)}}
          />
        </td>
      </tr>
    </div>
  )
}
  const mapStateToProps = (state) => {
      return {
        transactions: state.firestore.ordered.transactions,
      }
  }

  const mapDispatchToProps = (dispatch) => {
      return{
        createTransaction: (transaction) => dispatch(createTransaction(transaction))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHeader)
