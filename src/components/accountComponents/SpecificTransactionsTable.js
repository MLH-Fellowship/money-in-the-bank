import React from "react";
import Table from 'react-bootstrap/Table'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../App.css';

const SpecificTransactionsTable = ({transactions}) => {
  const transactionItems = transactions.map((transaction) =>
    <tr className="paddingVertical transactionItems">
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
  );

  return(
    <div className="border paddingTop">
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
  )
}

export default SpecificTransactionsTable