import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from "react-router-dom";

class Dashborad extends Component {
  render(){
    const { transactions } = this.props;
    //let transactions = this.state.transactions
      return (
        <div>
          <section>
              You are logged in
          </section>
          <Link
            to={{
              pathname: "/mainuserspecific",
              props: { transactions: transactions }
            }}>
            <button >Main User Specific Account</button>
          </Link>
          <Link
            to={{
              pathname: "/mainuserall",
              props: { transactions: transactions }
            }}>
            <button >Main User All Accounts</button>
          </Link>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
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