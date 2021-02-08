import React from "react";
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import '../../../src/App.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function MyAccounts({accounts, transactions}) {
  const accountItems = accounts && accounts.length > 0 ?accounts.map((account) =>
  <tr>
    <Link
        to={{
          pathname: `/mainuserspecific`,
          aboutProps: { account: account }
        }}>
          <td>{account.name}:</td>
          <td className="balance">
            <span className={account.working_balance < 0 && "negative-balance" }>{account.working_balance}</span>
          </td>
      </Link>
    </tr>
  ): '';

  return(
    <div className='unmarkedList'>
      <ul className="view-links">
        <li>
        <Link
            to={{
              pathname: "/",
              props: { transactions: transactions }
            }}>
            <span>Budget</span>
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/mainuserall",
              props: { transactions: transactions }
            }}>
            <span>All Accounts</span>
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
          <button className="budget-button">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Account
          </button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.firestore.ordered.accounts,
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