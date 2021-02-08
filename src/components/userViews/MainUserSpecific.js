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
    //console.log('props', props)
    // let accountID = this.props.location.aboutProps.account.id
    let accountName = this.props.location.aboutProps ? this.props.location.aboutProps.account.name : ''
    let { transactions } = this.props;
    let filteredTransactions = transactions && transactions.length > 0 ? transactions.filter(transaction => transaction.account === 'Target Credit Card') : [];

    return (
      <div className="App paddingTop">
        <h2>{accountName}</h2>
        <TransactionsTable transactions={filteredTransactions} view='specific' accountName={accountName}/>
        <TransactionsSummary transactions={filteredTransactions}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state', state)
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
