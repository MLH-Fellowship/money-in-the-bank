import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../src/App.css';
import { Link } from "react-router-dom";

const TransactionsSummary = (transactions) => {
  transactions = transactions.transactions
  let cleared_balance = 0
  let uncleared_balance = 0
  console.log('transactions', transactions)
  
  for(let i = 0; i < transactions.length; i++){
    if(transactions[i].clear){
      if(transactions[i].inflow){
        cleared_balance += parseInt(transactions[i].inflow)
      }
      if(transactions[i].outflow){
        cleared_balance -= parseInt(transactions[i].outflow)
      }
    }else if(!transactions[i].clear){
      if(transactions[i].inflow){
        uncleared_balance += parseInt(transactions[i].inflow)
      }
      if(transactions[i].outflow){
        uncleared_balance -= parseInt(transactions[i].outflow)
      }
    }
  }
  console.log('cleared', cleared_balance)
  console.log('uncleared', uncleared_balance)
  let totalBal = cleared_balance + uncleared_balance

  return(
    <div className="grid-container2 border padding">
      <div className="addTransaction">
        <Link
          to={{
            pathname: "/createtransaction",
            // props: { transactions: transactions }
          }}>
          <button >
            <FontAwesomeIcon icon={faPlusCircle} /> Add a New Transaction
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
        Cleared: ${cleared_balance} + Uncleared: ${uncleared_balance}= ${totalBal}
      </div>
    </div>
  )
}

export default TransactionsSummary