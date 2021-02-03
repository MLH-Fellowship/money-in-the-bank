import React from 'react'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle  } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../src/App.css';

const MainUserSpecific = () => {
  // Replace with API call
  const accounts = [
    {
      name: 'Chase Bank',
      balance: 950,
    },
    {
      name: 'Citibank Visa',
      balance: -763,
    },
    {
      name: 'BofA MasterCard',
      balance: 950,
    },
    {
      name: 'BofA Checking',
      balance: 950,
    },
    {
      name: 'IRA Account',
      balance: 950,
    },
    {
      name: 'Gap Store Card',
      balance: 950,
    },
  ];
  const accountItems = accounts.map((account) =>
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
  // Replace with API call
  const transactions = [
    {
      date: '1/27/21',
      payee: 'Safeway',
      category: 'Daily- Groceries',
      note: 'Party',
      outflow: '25.36',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Valero',
      category: 'Weekly- Gas',
      note: '',
      outflow: '40',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Netflix',
      category: 'Monthly- Entertainment',
      note: 'Price Increase',
      outflow: '19.99',
      inflow: '',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'AAA',
      category: 'Annual- Car Insurance',
      note: '',
      outflow: '1000',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: '',
      category: 'Monthly- Income',
      note: '',
      outflow: '',
      inflow: '1200',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'Comcast',
      category: 'Monthly- Internet',
      note: '',
      outflow: '75',
      inflow: '',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'Safeway',
      category: 'Daily- Groceries',
      note: '',
      outflow: '44.23',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Target',
      category: 'Daily- Household Goods',
      note: 'TP',
      outflow: '25.36',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Landlord',
      category: 'Monthly- Rent',
      note: '',
      outflow: '2000',
      inflow: '',
      cleared: true
    },
  ]
  const transactionItems = transactions.map((transaction) =>
  <div className="transactionItems">
    <tr className="paddingVertical">
      <td width="175">{transaction.date}</td>
      <td width="175">{transaction.payee}</td>
      <td width="175">{transaction.category}</td>
      <td width="175">{transaction.note}</td>
      <td width="175">{transaction.outflow}</td>
      <td width="175">{transaction.inflow}</td>
      {transaction.cleared &&
        <td width="175"><FontAwesomeIcon icon={faCheck} /></td>
      }
    </tr>
  </div>
  );

  let cleared = 864.65
  let uncleared = 85.35
  let totalBal = 950
  return (
    <div className="App grid-container paddingTop">
      <div className="item1 unmarkedList">
        {/* TODO: what do these do? Navigate to another page or filter */}
        <ul>
          <li>
            <a className="unmarkedLink" href="#" onclick="console.log('Budget')">
              Budget
            </a>
          </li>
          <li>
            <a className="unmarkedLink" href="#" onclick="console.log('All Transactions')">
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
        {/* --------------------------------------------------------- */}
      </div>
      <div className="item2 border paddingTop">
        <Table>
          <thead>
            <div>
              <tr className="paddingVertical">
                <th width="175">Date</th>
                <th width="175">Payee</th>
                <th width="175">Category</th>
                <th width="175">Note</th>
                <th width="175">Outflow</th>
                <th width="175">Inflow</th>
                <th width="175">Cleared</th>
              </tr>
            </div>
          </thead>
          <tbody >
            {transactionItems}
          </tbody>
        </Table>
      </div>
      <div className="summary item3 border padding grid-container2">
        <div className="addTransaction">
          <a className="unmarkedLink" href="#" onclick="console.log('Budget')">
            <FontAwesomeIcon icon={faPlusCircle} /> Add a new transaction
          </a>
        </div>
        <div className="makeTransfer">
          <a className="unmarkedLink" href="#" onclick="console.log('Budget')">
            <FontAwesomeIcon icon={faPlusCircle} /> Make a transfer
          </a>
        </div>
        <div className="total">
          Cleared: ${cleared} + Uncleared: ${uncleared}= ${totalBal}
        </div>

      </div>
    </div>
  );
}
export default MainUserSpecific;
