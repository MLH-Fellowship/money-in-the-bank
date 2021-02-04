import React, {useEffect, useState, Fragment} from 'react'
import { connect } from 'react-redux'
import {getBudget, createBudget} from '../../store/actions/budgetActions'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle  } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import BudgetTableBody from './BudgetTableBody'

var dayjs = require('dayjs')

const BudgetView = ({getBudget, budget, categories, categoryHeaders}) => {
    useEffect(() => {
        getBudget(dayjs().format('MMMYYYY'));
    },[]);
    // is this a problem on a new month?
    
    if(!budget){
        return <p>...</p>
    }

    const {budgeted, funds, previous_overspent, balance, month}=budget
    const categoryList = Object.keys(categories)
    return (
        <Fragment>
            <header className='budget-header'>
                <article className="budget-date">
                    <h1>
                        {dayjs().format('MMM')}{" "}{dayjs().format('YYYY')}
                    </h1>
                </article>
                <section className='budget-header-funds'>
                    <article className='budget-header-available'>
                        <p style={{}}><b>${balance}</b>
                        <br/><span style={{fontSize:'16px'}}><i> Available To Budget</i></span></p>
                    </article>
                    <article className="budget-header-break-down">
                        <p className="align-right"><b>+${funds}</b></p>
                        <p className="align-left"><i>Funds for this month</i></p>
                        <p className="align-right"><b>-${previous_overspent}</b></p>
                        <p className="align-left"><i>Accumulated overspending</i></p>
                        <p className="align-right"><b>-${budgeted}</b></p>
                        <p className="align-left"><i>Budgeted</i></p>
                    </article>
                </section>
            </header>
            <main>
            <Table>
                <thead>
                    <tr className="paddingVertical">
                    <th width="175">Category</th>
                    <th width="175">Budgeted</th>
                    <th width="175">Activity</th>
                    <th width="175">Available</th>
                    </tr>
                </thead>
                {categoryHeaders && categoryHeaders.length > 0 && (
                    <BudgetTableBody categories={categories} categoryHeaders={categoryHeaders} month={month}/>
                )}
            </Table>
            </main>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        budget: state.budget.budget,
        categories: state.budget.budget.categories,
        categoryHeaders: state.budget.categoryHeaders
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getBudget: (month) => dispatch(getBudget(month)),
        createBudget: (month) => dispatch(createBudget(month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetView)
