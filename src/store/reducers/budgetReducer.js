const initState={
    categoryHeaders:[
        'Basics',
        'Secondary',
        'Savings',
        'Fun',
        'Other'
    ],
    budget:{}
}

const budgetReducer = (state=initState, action) => {
    switch(action.type){
        case 'CREATE_TRANSACTION':
          console.log('created transaction', action.transaction)
          return state;
        case 'CREATE_PROJECT_ERROR':
          console.log('create project error', action.err)
          return state
        case 'GET_BUDGET':
            return {
                ...state,
                budget: action.budget,
                available: action.budget.available,
                goal:action.budget.goal,
                budgeted: action.budget.budgeted
            }
        case 'CREATE_BUDGET':
        return {
            ...state,
            budget: action.budget,
            available: action.budget.available,
            goal: action.budget.goal,
            budgeted: action.budget.budgeted
        }
        case 'UPDATE_BUDGET':
            return {
                ...state,
                budget: action.budget,
                available: action.budget.available,
                goal:action.budget.goal,
                budgeted: action.budget.budgeted
            }
        case 'CREATE_CATEGORY':
            return {
                ...state,
                budget: action.budget
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                budget: action.budget,
                budgeted: action.budgeted,
                available: action.available
                // goal:action.budget.goal
            }
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                budget: action.budget,
                budgeted: action.budgeted,
                available: action.available
                // goal:action.budget.goal
            }
        case 'UPDATE_CATEGORY_NAME':
            return {
                ...state,
                budget: action.budget,
                categories: action.categories
            }
        case 'GET_TRANSACTIONS_BY_USER':
            return {
                ...state,
                userTransactions:action.transactions
            }
        default:
            return state;
    }
}

export default budgetReducer