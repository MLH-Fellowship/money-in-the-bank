import React, {useEffect, Fragment, useState} from 'react'
import { connect } from 'react-redux'
import {getBudget, createBudget} from '../../store/actions/budgetActions'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import BudgetTableBody from './BudgetTableBody'
import BudgetViewHeader from './BudgetViewHeader'
import '../../../src/App.css';

var dayjs = require('dayjs')

const BudgetView = ({getBudget, budget, categories, categoryHeaders}) => {
    const [overBudget, setOverBudget] = useState(0)
    useEffect(() => {
        getBudget(dayjs().format('MMMYYYY'));
    },[]);
    // is this a problem on a new month?
    
    if(!budget){
        return <p>...</p>
    }

    const { month}=budget

    return (
        <Fragment>
            <BudgetViewHeader budget={budget} overBudget={overBudget} setOverBudget={setOverBudget}/>
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
                        <BudgetTableBody categories={categories} categoryHeaders={categoryHeaders} month={month} overBudget={overBudget} setOverBudget={setOverBudget}/>
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
