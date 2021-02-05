import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import TransactionSummary from '../accountComponents/TransactionSummary'
import MyAccounts from '../accountComponents/MyAccounts'
import SpecificTransactionsTable from '../accountComponents/SpecificTransactionsTable'
import '../../../src/App.css';

class MainUserSpecific extends Component {
  render(){
    // console.log('props', props)
    let { myAccounts, transactions, cleared, uncleared, totalBal } = this.props;

    return (
      <div className="App grid-container paddingTop">
        <div className="item1">
          <MyAccounts myAccounts={myAccounts}/>
        </div>
        <div className="item2">
          <SpecificTransactionsTable transactions={transactions}/>
        </div>
        <div className="item3">
          <TransactionSummary
            cleared={cleared}
            uncleared={uncleared}
            totalBal={totalBal}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myAccounts: state.budgets.myAccounts,
    transactions: state.budgets.transactions,
    budgets: state.budgets.budgets,
    cleared: state.budgets.cleared,
    uncleared: state.budgets.uncleared,
    totalBal: state.budgets.totalBal
  }
}

export default connect(mapStateToProps)(MainUserSpecific);
