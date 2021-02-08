import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { getTransactionByCategory } from '../../store/actions/budgetActions'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import App from '../../App'
import '../../../src/App.css';

var dayjs = require('dayjs')
const CatTransactions = ({cat,id, getTransactionByCategory, categoryTransactions }) => {
    useEffect(() => {
        getTransactionByCategory(cat,id);
    },[]);
    
    const transactionItems = categoryTransactions && categoryTransactions.length > 0 ?
    categoryTransactions.map((transaction) =>
        <tr className="paddingVertical transactionItems" key={transaction.id}>
            <td width="175">{transaction.account}</td>
            <td width="175">{transaction.date}</td>
            <td width="175">{transaction.payee}</td>
            <td width="175">{transaction.category}</td>
            <td width="175">{transaction.memo}</td>
            <td width="175">{transaction.outflow}</td>
            <td width="175">{transaction.inflow}</td>
            {transaction.clear &&
                <td width="175"><FontAwesomeIcon icon={faCheck} /></td>
            }
        </tr>
    )
    :
    <tr></tr>

    return(
        <Fragment>
            <header className='budget-header'>
                <article className="budget-date">
                    <h1>
                        {cat}:{" "}
                        {dayjs().format('MMM')}{" "}{dayjs().format('YYYY')}
                    </h1>
                </article>
                <section className='budget-header-funds'>
                </section>
            </header>
            <main className="border paddingTop">
                <Table>
                    <thead>
                    <tr className="paddingVertical">
                        <th width="175">Account</th>
                        <th width="175">Date</th>
                        <th width="175">Payee</th>
                        <th width="175">Category</th>
                        <th width="175">Note</th>
                        <th width="175">Outflow</th>
                        <th width="175">Inflow</th>
                        <th width="175">Cleared</th>
                    </tr>
                    </thead>
                    <tbody >
                        {transactionItems}
                    </tbody>
                </Table>
                <Link to={{ pathname: "/createtransaction"}}>
                    <button>
                        <FontAwesomeIcon icon={faPlusCircle} /> Add a New Transaction
                    </button>
                </Link>
            </main>
        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    const cat = ownProps.match.params.cat;
    const id = ownProps.match.params.id;
    return {
      cat,
      id,
      categoryTransactions: state.budget.categoryTransactions
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getTransactionByCategory: (cat,id) => dispatch(getTransactionByCategory(cat,id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatTransactions)
