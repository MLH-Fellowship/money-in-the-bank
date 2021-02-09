import React, { Fragment, useState }  from 'react'
import BudgetCategory from './BudgetCategory'
import BudgetCategoryHeader from './BudgetCategoryHeader'
const BudgetTableBody = ({categories, month, categoryHeaders, overBudget, setOverBudget}) => {
    const [createdCategory, setCreatedCategory] = useState()

    return (
        <tbody className="budget-table">
            {categories && categoryHeaders && categoryHeaders.length > 0 && (
                categoryHeaders.map((header, idx) =>{
                    let cs = categories[header]
                    return(
                        <Fragment key={`header-${header}`}>
                            <BudgetCategoryHeader key={`header-${header}-${idx}`} header={header} idx={idx} month={month} createdCategory={createdCategory} setCreatedCategory={setCreatedCategory} overBudget={overBudget} setOverBudget={setOverBudget}/>
                            { cs && cs.length > 0 && (
                                cs.map((name, idx) => {
                                    return(
                                        <BudgetCategory key={`${header}-${name}-${idx}`} c={categories[header][idx]} idx={idx} header={header} month={month} overBudget={overBudget} setOverBudget={setOverBudget} />
                                    )
                                })
                            )}
                        </Fragment>
                    )
                })
            )}
      </tbody>
    )
}

export default BudgetTableBody
