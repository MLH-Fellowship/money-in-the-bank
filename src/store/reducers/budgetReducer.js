const initState = {
  message: 'The reducer is connected!',
  cleared: 864.65,
  uncleared: 85.35,
  totalBal: 950
  }

const budgetReducer = (state=initState, action) => {
    switch(action.type){
        case 'CREATE_TRANSACTION':
          console.log('created transaction', action.transaction)
          return state;
        case 'CREATE_PROJECT_ERROR':
          console.log('create project error', action.err)
          return state
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