import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../src/App.css';
import { Link } from "react-router-dom";

const SpecificAccountsTable = ({cleared, uncleared, totalBal}) => {

  return(
    <div className="grid-container2 border padding">
      <div className="addTransaction">
        <Link
          to={{
            pathname: "/createtransaction",
            // props: { transactions: transactions }
          }}>
          <button >
            <FontAwesomeIcon icon={faPlusCircle} /> Create New Transaction
          </button>
        </Link>
      </div>
      <div className="makeTransfer">
        <Link
          to={{
            pathname: "/",
            // props: { transactions: transactions }
          }}>
          <button >
            <FontAwesomeIcon icon={faPlusCircle} /> Make a transfer
          </button>
        </Link>
      </div>
      <div className="total">
        Cleared: ${cleared} + Uncleared: ${uncleared}= ${totalBal}
      </div>
    </div>
  )
}

export default SpecificAccountsTable