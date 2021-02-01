const initState={
    message: 'The reducer is connected!'
}

const budgetReducer = (state=initState, action) => {
    switch(action.type){
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                message: action.message
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