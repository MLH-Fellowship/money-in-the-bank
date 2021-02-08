import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../src/App.css';
import { compose } from 'redux'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
var dayjs = require('dayjs')

class TransactionsTable extends Component {
  render(){
    let { transactions, view, accountName } = this.props;
    if(view === 'specific'){
      transactions = transactions.filter((transaction => transaction.account === accountName))
    }
    const transactionItems = transactions && transactions.length > 0 ?
    transactions.map((transaction) =>
      <tr className="paddingVertical transactionItems" key={transaction.id}>
        {view === 'all' &&
          <td width="175">{transaction.account}</td>
        }
        {console.log(typeof transaction.date)}
        {typeof transaction.date === 'object' ?
          <td width="175">{dayjs.unix(transaction.date.seconds).format('MMM DD YYYY')}</td> 
          :
          <td width="175">{dayjs(transaction.date).format('MMM DD YYYY')}</td>
        }
        <td width="175">{transaction.payee}</td>
        <td width="175">{transaction.category}</td>
        <td width="175">{transaction.memo}</td>
        <td width="175">{transaction.outflow}</td>
        <td width="175">{transaction.inflow}</td>
        {transaction.clear &&
          <td width="175"><FontAwesomeIcon icon={faCheck} /></td>
        }
      </tr>
    )
    :
    <tr></tr>

    return(
      <div className="border paddingTop">
        <Table>
          <thead>
            <tr className="paddingVertical">
              {view === 'all' &&
                <th width="175">Account</th>
              }
              <th width="175">Date</th>
              <th width="175">Payee</th>
              <th width="175">Category</th>
              <th width="175">Note</th>
              <th width="175">Outflow</th>
              <th width="175">Inflow</th>
              <th width="175">Cleared</th>
            </tr>
          </thead>
          <tbody >
            {transactionItems}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.firestore.ordered.transactions,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'transactions' }
  ])
)(TransactionsTable)
