import React from "react";
import Table from 'react-bootstrap/Table'
import '../../../src/App.css';

const MyAccounts = ({myAccounts}) => {
  console.log(myAccounts)
  const accountItems = myAccounts.map((account) =>
    <tr>
      <td>{account.name}:</td>
      {account.balance < 0 &&
        <td className="red">{account.balance}</td>
      }
      {account.balance > 0 &&
        <td>{account.balance}</td>
      }
    </tr>
  );

  return(
    <div className='unmarkedList'>
      {/* TODO: what do these do? Navigate to another page or filter */}
      <ul>
        <li>
          <a className="unmarkedLink" href="#" onClick="console.log('Budget')">
            Budget
          </a>
        </li>
        <li>
          <a className="unmarkedLink" href="#" onClick="console.log('All Transactions')">
            All Transactions
          </a>
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

export default MyAccounts