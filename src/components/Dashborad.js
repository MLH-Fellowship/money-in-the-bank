import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from "react-router-dom";
import { createTransaction} from '../store/actions/budgetActions'
import MyAccounts from './accountComponents/MyAccounts'
import '../App.css';

class Dashborad extends Component {
  render(){
    const { transactions, accounts } = this.props;
    console.log('transactions', transactions)
    console.log('accounts', accounts)
    return (
      <div className="App grid-container paddingTop">
        <div className="item1">
          <div>
            <section>
                You are logged in
            </section>
            {/* <MyAccounts myAccounts={accounts}/> */}
          </div>
        </div>
        <div className="item2">
          <Link
            to={{
              pathname: "/mainuserspecific",
              props: { transactions: transactions }
            }}>
            <button >Main User Specific Account</button>
          </Link>
        </div>
        <div className="item3">
          <Link
            to={{
              pathname: "/mainuserall",
              props: { transactions: transactions }
            }}>
            <button >Main User All Accounts</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
    return {
      transactions: state.firestore.ordered.transactions,
      accounts: state.firestore.ordered.accounts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'transactions' },
    { collection: 'accounts' }
  ])
)(Dashborad)