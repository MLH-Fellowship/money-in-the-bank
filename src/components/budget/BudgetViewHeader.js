import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateSpendingGoal,getBudget, getTransactionByCategory } from '../../store/actions/budgetActions'
import MonthPicker from './MonthPicker'
import { withRouter } from 'react-router'

var dayjs = require('dayjs')

const BudgetViewHeader = ({id, history, budget, updateSpendingGoal,getBudget, available, budgeted, goal, getTransactionByCategory }) => {
    const {funds,  balance, unbudgeted, month}=budget
    const [spendingGoal, setSpendingGoal] = useState(0)
    const [spendingAvailable, setSpendingAvailable] = useState(0)

    const idTemp = id ?  dayjs(id).format('MMMYYYY') : dayjs().format('MMMYYYY')
    const [budgetDate, setBudgetDate] = useState(new Date(idTemp))
    const [budgetMonth, seBudgetMonth] = useState(idTemp)

    useEffect((spendingAvailable, spendingGoal) => {
        // console.log('BVH UE', id, '?')
        if(spendingAvailable !== available){
            setSpendingAvailable(available);
        }
        if(spendingGoal !== goal){
            setSpendingGoal(goal);
        }
        getBudget(budgetMonth);
    },[available, goal, budgetMonth]);

    const setMonth = (month) => {
        setBudgetDate(month)
        seBudgetMonth(dayjs(month).format('MMMYYYY'))
        history.push(`/budget/${dayjs(month).format('MMMYYYY')}`)
    }

    const onChange = (e) => {
        if(e.target.value === ""){
            setSpendingGoal(0);
        }else{
        setSpendingGoal(parseInt(e.target.value));
        }
    }

    const onBlur = (e) => {
        if(spendingGoal !== goal){
            // console.log('bluris', month, spendingGoal,budgeted,unbudgeted)
            setSpendingAvailable(spendingGoal-budgeted)
            updateSpendingGoal(month, spendingGoal, budgeted,unbudgeted)
        }
    }

    return (
        <header className='budget-header'>
            <article className="budget-date">
                <h1>
                    {dayjs(budgetMonth).format('MMM')}{" "}{dayjs(budgetMonth).format('YYYY')}
                </h1>
                <MonthPicker date={budgetDate ? budgetDate : new Date()} setDate={setMonth}/>
            </article>
            <section className='budget-header-funds'>
                <article className='budget-header-available'>
                    <b>${spendingAvailable}</b>
                    <br/><span style={{fontSize:'16px'}}><i> Available To Budget</i></span>
                </article>
                <article className="budget-header-break-down">
                    <p className="align-right"> $ <input style={{width:'75px', textAlign:'right', padding:'0 2px', margin:'0'}} type="text" onChange={onChange} onBlur={onBlur} value={spendingGoal}/> </p>
                    <p className="align-left"><i>Spending Goal</i></p>
                    <p className="align-right"><b>-${budgeted}</b></p>
                    <p className="align-left"><i>Budgeted</i></p>
                    <p className="align-right"><b>-${unbudgeted}</b></p>
                    <p className="align-left"><i>Unbudgeted Activity</i></p>
                </article>
            </section>
        </header>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match ? ownProps.match.params.id : null;
    const history = ownProps.history
    return {
        id,
        history,
        budget: state.budget.budget,
        available: state.budget.available,
        goal: state.budget.goal,
        budgeted: state.budget.budgeted
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getBudget: (month) => dispatch(getBudget(month)),
        getTransactionByCategory : (cat) => dispatch(getTransactionByCategory(cat)),
        updateSpendingGoal: (month,goal,budgeted,unbudgeted) => dispatch(updateSpendingGoal(month,goal,budgeted,unbudgeted))
    }
}

export default withRouter(
connect(mapStateToProps, mapDispatchToProps)
(BudgetViewHeader))

