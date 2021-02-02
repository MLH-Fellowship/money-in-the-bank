const budgetTemp = {
    balance:60,
    budgeted: 1800,
    funds:2260,
    previous_overspent:0,
    categories:
    [
        {
            Monthly: [
                {
                    Rent: {
                        Budgeted: 1700,
                        Available: 0,
                        Activity: -1700
                    },
                    
                    Transportation: {
                        Activity: -40,
                        Available: 60,
                        Budgeted:100
                    },
                    'Car Insurance' : {
                        Activity: -47.99,
                        Available: 0,
                        Budgeted:47.99
                    },
                }
            ]
        },
        {
            Weekly: [
                {
                    Groceries: {
                        Budgeted: 100,
                        Available: 20,
                        Activity: 80
                    }
                }
            ]
        }
    ],
    Income: {
        Activity: 4000,
        Available: 4000,
        Budgeted:4000
    }
}

export const createTransaction = (transaction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //call db
        const firestore = getFirestore();
        firestore.collection('transactions').add({
          ...transaction,
          primaryUser: 'user1',//TODO: replace with account's main user id
          user: 'user2',
          createdAt: new Date()
          // catagory:'new',

        }).then(() => {
            dispatch({type: 'CREATE_TRANSACTION', transaction});
        }).catch((err)=> {
            console.log('ERROR: ', err)
            dispatch({type:'CREATE_TRANSACTION_ERROR', err})
        })
    }
}

export const createAccount = (account) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //call db
        const firestore = getFirestore();
        firestore.collection('accounts').add({
          ...account,
          cleared_balance: 0,
          primaryUser: 'user1',//TODO: replace with account's main user id
          uncleared_balance: 0,
        }).then(() => {
            dispatch({type: 'CREATE_ACCOUNT', account});
        }).catch((err)=> {
            console.log('ERROR: ', err)
            dispatch({type:'CREATE_ACCOUNT_ERROR', err})
        })
    }
}

export const getBudget = (month) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log(month)
        const firestore = getFirestore();
        firestore.collection('budgets').doc(month).get()
        .then(function(doc) {
            if (doc.exists){
              var budget = doc.data();
              budget.month=month
              dispatch({type: 'GET_BUDGET', budget});
            } else {
                // make a new budget if none exists
                firestore.collection('budgets').doc(month).set(budgetTemp)
                .then(function(docRef) {
                    budgetTemp.month=month
                    console.log("Document written with ID: ", docRef.id);
                    dispatch({type: 'CREATE_BUDGET', budget: budgetTemp});
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }})    
        .catch((err)=> {
            console.log('ERROR: ', err)
            dispatch({type:'GET_BUDGET_ERROR', err})
        })
    }
}

export const editTransaction = () => {
}

export const deleteTransaction = () => {
}

export const editAccount = () => {
}

export const deleteAccount = () => {
}
export const createBudget = (month, budget) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('cc')
        const firestore = getFirestore();
        firestore.collection('budgets').doc(month).set(budget)
        .then(function(docRef) {
            budget.month=month
            console.log("Document written with ID: ", docRef.id);
            dispatch({type: 'CREATE_BUDGET', budget});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}
