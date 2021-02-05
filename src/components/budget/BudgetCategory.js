import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { updateCategory, updateCategoryName, deleteCategory } from '../../store/actions/budgetActions';
import {connect} from 'react-redux'

const BudgetCategory = ({ idx, header, c, month, updateCategory, updateCategoryName, deleteCategory, budget, goal}) => {
    const [focus, setFocus] = useState(false);
    const [catName, setCatName] = useState(c.name);
    const [catNameBak, setCatNameBak] = useState(c.name);
    const [budgeted, setBudgeted] = useState(parseInt(c.budgeted));
    const [catAvailable, setCatAvailable] = useState(c.available);
    const [deleted, setDeleted] = useState(false)

    const onChange = (e) => {
        if(e.target.id === header+"."+c.name){
            setCatName(e.target.value);
        }else if (e.target.id === header+"."+c.name+".budgeted"){
            if(e.target.value === ""){
                setBudgeted(0);
            }else{
                setBudgeted(parseInt(e.target.value));
            }
        }
    }

    const onMouseEnter = (e) => {
        setFocus(true);
    }
    const onMouseLeave = (e) => {
        setFocus(false);
        if(catName !== catNameBak){
            setCatName(catNameBak)
        }
    }

    const onDelete = (e) => {
        deleteCategory(month, header, c.name, budget, budgeted)
        setDeleted(true)
    }

    const onUpdate = (e) => {
        updateCategoryName(month, header, idx, c.name, catName, budget);
        setFocus(false);
        setCatNameBak(catName);
    }

    const onBudgetedFocus = (e) => {
        console.log('focis')
    }

    const onBudgetedBlur = (e) => {
        if(budgeted !== c.budgeted){
            const available = c.available + budgeted - c.budgeted + c.activity
            setCatAvailable(available);
            setBudgeted(budgeted)
            console.log('und?', goal)
            // month, header,idx,available, newBudgeted, oldBudgeted, activity, name, budget, goal
            updateCategory(month, header,idx,available, budgeted,c.budgeted, c.activity, c.name, budget, goal)
        }
    }

    const isHidden = focus ? false : true
    // const isHidden = focus || name !== catName ? false : true
    if(!c){return <></>}
    else if (deleted){return <></>}
    return (
        <tr key={`cat-${c.name}-${idx}`}>
            <td><p style={{paddingLeft:'20px'}} onMouseLeave={e=>onMouseLeave(e)}>
                <input onMouseOver={e=>onMouseEnter(e)} type="text" id={header+"."+c.name} onChange={e => onChange(e)} value={catName}/>
                <FontAwesomeIcon icon={faCheck} 
                    className={isHidden ? "hidden": "budget-icon"} 
                    style={{marginLeft:'8px'}} onClick={e=>{onUpdate(e)}}/>
                <FontAwesomeIcon icon={faTrash} 
                // === header+"."+name
                    className={isHidden ? "hidden": "budget-icon"} 
                style={{marginLeft:'10px'}} onClick={e=>{onDelete(e)}}/>
            </p></td>
            <td><p>
                $ <input type="text" id={header+"."+c.name+".budgeted"} onChange={onChange} onFocus={e=>onBudgetedFocus(e)} onBlur={e=>onBudgetedBlur(e)} value={budgeted}/>
            </p></td>
            <td><p>{c.activity}</p></td>
            <td><p>{catAvailable}</p></td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        budget: state.budget.budget,
        goal: state.budget.goal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateCategory: (month, header,idx,available, budgeted, oldBudgeted, activity, name, budget, goal) => dispatch(updateCategory(month, header,idx,available, budgeted, oldBudgeted,activity, name, budget, goal)),
        updateCategoryName: (month, header,idx, oldName, name, budget) => dispatch(updateCategoryName(month, header, idx, oldName, name, budget)),
        deleteCategory: (month, header, name, budget, catBudgeted) => dispatch (deleteCategory(month, header, name, budget, catBudgeted))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategory)
