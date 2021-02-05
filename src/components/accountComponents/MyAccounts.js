import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import '../../../src/App.css';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class MyAccounts extends Component {
  render() {
    let { myAccounts } = this.props;
    console.log('myAccounts', myAccounts)
    console.log('props', this.props)
    const accountItems = myAccounts.map((account) =>
      <tr key={account.id}>
        <td>{account.name}:</td>
        {account.working_balance < 0 &&
          <td className="red">{account.working_balance}</td>
        }
        {account.working_balance > 0 &&
          <td>{account.working_balance}</td>
        }
      </tr>
    );

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
            <span className="unmarkedLink" href="#">
              All Transactions
            </span>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    myAccounts: state.firestore.ordered.accounts,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'accounts' }
  ])
)(MyAccounts)