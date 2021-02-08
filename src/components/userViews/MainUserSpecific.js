import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import TransactionsSummary from '../accountComponents/TransactionsSummary'
import TransactionsTable from '../accountComponents/TransactionsTable'
import '../../../src/App.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class MainUserSpecific extends Component {
  render(){
    let accountID = this.props.location.aboutProps ? this.props.location.aboutProps.account.id : ''
    let accountName = this.props.location.aboutProps ? this.props.location.aboutProps.account.name : ''
    let { transactions } = this.props;
    console.log(accountName)
    let filteredTransactions = transactions && transactions.length > 0 ? transactions.filter(transaction => transaction.accountID === accountID) : [];
    console.log(filteredTransactions)
    return (
      <div className="App paddingTop">
        <h2>{accountName}</h2>
        <TransactionsTable transactions={filteredTransactions} view='specific' accountName={accountName}/>
        <TransactionsSummary transactions={filteredTransactions} accountName={accountName} accountName={accountName}/>
      </div>
    );
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
)(MainUserSpecific)
