const initState = {
  message: 'The reducer is connected!',
  myAccounts: [
    {
      name: 'Chase Bank',
      balance: 950,
    },
    {
      name: 'Citibank Visa',
      balance: -763,
    },
    {
      name: 'BofA MasterCard',
      balance: 950,
    },
    {
      name: 'BofA Checking',
      balance: 950,
    },
    {
      name: 'IRA Account',
      balance: 950,
    },
    {
      name: 'Gap Store Card',
      balance: 950,
    },
  ],
  transactions: [
    {
      date: '1/27/21',
      payee: 'Safeway',
      category: 'Daily- Groceries',
      note: 'Party',
      outflow: '25.36',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Valero',
      category: 'Weekly- Gas',
      note: '',
      outflow: '40',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Netflix',
      category: 'Monthly- Entertainment',
      note: 'Price Increase',
      outflow: '19.99',
      inflow: '',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'AAA',
      category: 'Annual- Car Insurance',
      note: '',
      outflow: '1000',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: '',
      category: 'Monthly- Income',
      note: '',
      outflow: '',
      inflow: '1200',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'Comcast',
      category: 'Monthly- Internet',
      note: '',
      outflow: '75',
      inflow: '',
      cleared: true
    },
    {
      date: '1/27/21',
      payee: 'Safeway',
      category: 'Daily- Groceries',
      note: '',
      outflow: '44.23',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Target',
      category: 'Daily- Household Goods',
      note: 'TP',
      outflow: '25.36',
      inflow: '',
      cleared: false
    },
    {
      date: '1/27/21',
      payee: 'Landlord',
      category: 'Monthly- Rent',
      note: '',
      outflow: '2000',
      inflow: '',
      cleared: true
    }],
  budgets: 'these are the budgets',
  cleared: 864.65,
  uncleared: 85.35,
  totalBal: 950
  }

const budgetReducer = (state=initState, action) => {
    switch(action.type){
        case 'CREATE_TRANSACTION':
          console.log('created transaction', action.project)
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