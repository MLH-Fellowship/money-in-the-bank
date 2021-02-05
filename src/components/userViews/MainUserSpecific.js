import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import TransactionsSummary from '../accountComponents/TransactionsSummary'
import MyAccounts from '../accountComponents/MyAccounts'
import TransactionsTable from '../accountComponents/TransactionsTable'
import '../../../src/App.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class MainUserSpecific extends Component {
  render(){
    console.log('props', this.props)
    let { myAccounts, transactions} = this.props;

    let filteredTransactions = transactions.filter(transaction => transaction.account === 'Target Credit Card');
    console.log(filteredTransactions);

    return (
      <div className="App grid-container paddingTop">
        <div className="item1">
          <MyAccounts myAccounts={myAccounts}/>
        </div>
        <div className="item2">
          <TransactionsTable transactions={filteredTransactions} view='specific'/>
        </div>
        <div className="item3">
          <TransactionsSummary transactions={filteredTransactions}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    myAccounts: state.firestore.ordered.accounts,
    transactions: state.firestore.ordered.transactions,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'accounts' },
    { collection: 'transactions' }
  ])
)(MainUserSpecific)
