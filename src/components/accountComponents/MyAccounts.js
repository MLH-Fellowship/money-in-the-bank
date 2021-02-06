import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import '../../../src/App.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class MyAccounts extends Component {
  render() {
    let { myAccounts, transactions } = this.props;
    // function calculateBal(accounts){
    //   let totalBal = 0
    //   accounts.map((account) => {
    //     totalBal += 
    //   })
    // }
    console.log('myAccounts', myAccounts)
    console.log('props', this.props)
<<<<<<< HEAD
    const accountItems = myAccounts && myAccounts.length > 0 ? 
    myAccounts.map((account) =>
      <tr key={account.id}>
        <td>{account.name}:</td>
        {account.working_balance < 0 &&
          <td className="red">{account.working_balance}</td>
        }
        {account.working_balance > 0 &&
          <td>{account.working_balance}</td>
        }
      </tr>
    )
    :
    <tr></tr>
=======
    const accountItems = myAccounts.map((account) =>

     <Link
        to={{
          pathname: `/mainuserspecific`,
          aboutProps: { account: account }
        }}>
        <button >{account.name}:
          {account.working_balance < 0 &&
            <span className="red">{account.working_balance}</span>
          }
          {account.working_balance > 0 &&
            <span>{account.working_balance}</span>
          }
        </button>
      </Link>
    );
>>>>>>> WIP

    return(
      <div className='unmarkedList'>
        {/* TODO: what do these do? Navigate to another page or filter */}
        <ul>
          <li>
            <span className="unmarkedLink" href="#">
              Budget
            </span>
          </li>
          <li>
            <Link
              to={{
                pathname: "/mainuserall",
                props: { transactions: transactions }
              }}>
              <button >Main User All Accounts</button>
            </Link>
          </li>
        </ul>
        <Table>
          <thead>
            <tr>
              <th>My Accounts</th>
            </tr>
          </thead>
          <tbody>
            {accountItems}
          </tbody>
        </Table>
        <div className="addNewAccount">
          <Link
            to={{
              pathname: "/createaccount",
            }}>
            <button >
              <FontAwesomeIcon icon={faPlusCircle} /> Add Account
            </button>
          </Link>
        </div>
      </div>
    )
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
    { collection: 'transactions' },
  ])
)(MyAccounts)