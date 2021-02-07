import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateSpendingGoal,getBudget, getTransactionByCategory } from '../../store/actions/budgetActions'
var dayjs = require('dayjs')

const BudgetViewHeader = ({budget, updateSpendingGoal,getBudget, available, budgeted, goal, getTransactionByCategory }) => {
    const {funds,  balance, unbudgeted, month}=budget
    const [spendingGoal, setSpendingGoal] = useState(0)
    const [spendingAvailable, setSpendingAvailable] = useState(0)

    useEffect((spendingAvailable, spendingGoal) => {
        console.log('BVH UE')
        if(spendingAvailable !== available){
            setSpendingAvailable(available);
        }
        if(spendingGoal !== goal){
            setSpendingGoal(goal);
        }
        getBudget(dayjs().format('MMMYYYY'));
    },[available, goal]);

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

    const getIt = () => {
        getTransactionByCategory("Groceries")
    }
    return (
        <header className='budget-header'>
            <article className="budget-date">
                <h1>
                    {dayjs().format('MMM')}{" "}{dayjs().format('YYYY')}
                    <button onClick={()=>getIt()}>CLICK ME!</button>
                </h1>
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

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewHeader)

