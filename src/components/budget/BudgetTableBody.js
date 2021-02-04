import React, { Fragment, useState }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle, faMinusCircle, faTrash  } from '@fortawesome/free-solid-svg-icons'
import BudgetCategory from './BudgetCategory'
import BudgetCategoryHeader from './BudgetCategoryHeader'
const BudgetTableBody = ({categories, labels, month, categoryHeaders}) => {
    const [focus, setFocus] = useState("")
    const [updateValue, setUpdateValue] = useState("")
    const [showNewCategory, setShowNewCategory] = useState(false)
    const [createdCategory, setCreatedCategory] = useState()

    const toggleShowNewCategory = (e) =>{
        setShowNewCategory(!showNewCategory)
    }
    return (
        <tbody className="budget-table">
            {categoryHeaders && categoryHeaders.length > 0 && (
                categoryHeaders.map((header, idx) =>{
                    let cs = categories[header]
                    return(
                        <Fragment key={`header-${header}`}>
                            <BudgetCategoryHeader key={`header-${header}-${idx}`} header={header} idx={idx} month={month} createdCategory={createdCategory} setCreatedCategory={setCreatedCategory}/>
                            {createdCategory && createdCategory.header === header && (
                                <BudgetCategory key={`${header}-${createdCategory.name}-00`} c={createdCategory} idx={0} header={header} month={month} cs={cs} />
                            )}
                            { cs && cs.length > 0 && (
                                cs.map((name, idx) => {
                                    return(
                                        <BudgetCategory key={`${header}-${name}-${idx}`} c={categories[header][idx]} idx={idx} header={header} month={month} cs={cs} />
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
