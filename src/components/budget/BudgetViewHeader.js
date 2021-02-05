import React from 'react'
var dayjs = require('dayjs')

const BudgetViewHeader = ({budget}) => {
    const {budgeted, funds, previous_overspent, balance, month}=budget
    return (
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
    )
}

export default BudgetViewHeader
