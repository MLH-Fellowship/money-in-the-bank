import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { createCategory } from '../../store/actions/budgetActions'
import {getBudget, createBudget} from '../../store/actions/budgetActions'

const BudgetCategoryHeader = ({header, idx, name, budget, month, createCategory, setCreatedCategory}) => {
    // const [updateValue, setUpdateValue] = useState("")
    const [newCategory, setNewCategory] = useState("")
   
    const [getNewCategory, setGetNewCategory] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false)
    const iconClass = showNewCategory ? faMinusCircle : faPlusCircle
    var dayjs = require('dayjs')

    // useEffect(() => {
    //     console.log('?????')
    //     getBudget(dayjs().format('MMMYYYY'));
    // },[getNewCategory]);

    // const labels = Object.keys(categories)
    const onChange = (e) => {
        setNewCategory(e.target.value)
        // console.log('focus state:', focus, updateValue)
    }
    
    const toggleShowNewCategory = (e) =>{
        setShowNewCategory(!showNewCategory)
    }

    const createNewCategory = () => {
        createCategory(month, header, newCategory, budget)
        setShowNewCategory(false)
        setNewCategory("")
        setCreatedCategory({header, name:newCategory, available:0, budgeted:0, activity:0 })
        console.log('create', newCategory)
    }
    return (
        <tr>
            <td colSpan ='4'>
                <h2 style={{float:'left'}}>
                    {header}
                </h2>
                <FontAwesomeIcon icon={iconClass} 
                style={{margin:'0px 10px'}} onClick={e=>toggleShowNewCategory(e)}/>
                <input className={showNewCategory ? '':'hidden'} type="text" id={header+"."+name} onChange={e => onChange(e)} placeholder="New category" value={newCategory}/>
                <FontAwesomeIcon icon={faCheck} 
                className={showNewCategory && newCategory.length > 0 ? '':'hidden'}
                style={{marginLeft:'8px'}} onClick={e=>{createNewCategory(e)}}/>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        budget: state.budget.budget
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createCategory: (month, header, name, budget) => dispatch(createCategory(month, header, name, budget))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategoryHeader)
