import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../src/App.css';

const SpecificAccountsTable = ({cleared, uncleared, totalBal}) => {

  return(
    <div className="grid-container2 border padding">
      <div className="addTransaction">
        <a className="unmarkedLink" href="#" onClick="console.log('Budget')">
          <FontAwesomeIcon icon={faPlusCircle} /> Add a new transaction
        </a>
      </div>
      <div className="makeTransfer">
        <a className="unmarkedLink" href="#" onClick="console.log('Budget')">
          <FontAwesomeIcon icon={faPlusCircle} /> Make a transfer
        </a>
      </div>
      <div className="total">
        Cleared: ${cleared} + Uncleared: ${uncleared}= ${totalBal}
      </div>
    </div>
  )
}

export default SpecificAccountsTable