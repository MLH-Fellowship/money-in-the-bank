import {initialCategories} from '../../initialCategories'

export const createTransaction = (transaction) => {
    // month format JAN2021, FEB2021, MAR2021
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();
        const user = state.firebase.auth.uid
        const categoryTemplate = state.user.categoryTemplate
        const firestore = getFirestore();

        // need to get the budget of the transaction is being added to
        let budget;
        firestore.collection('budgets').doc(`${user}-${transaction.month}`).get()
        .then(function(doc) {
            if (doc.exists){
                console.log('---budget exists')
                budget = doc.data();
                //update the budget
                const cats = budget.categories;
                let catIdx
                let updatedBudgetFields={categories: cats};

                if(!transaction.category || transaction.category === ""){
                    console.log("---cat was blank")
                    updatedBudgetFields.unbudgeted = budget.unbudgeted + transaction.outflow;
                }else{
                    console.log("---cat was", transaction.category)
                    catIdx = cats[transaction.header].findIndex((c) => c.name === transaction.category);
                    console.log("---catIdx was:", catIdx)
                    const updatedCategory = {
                        available:cats[transaction.header][catIdx].available - transaction.outflow,
                        budgeted: cats[transaction.header][catIdx].budgeted,
                        activity: parseInt(cats[transaction.header][catIdx].activity) + parseInt(transaction.outflow),
                        name: cats[transaction.header][catIdx].name
                    }
                    cats[transaction.header][catIdx]=updatedCategory;
                }

                console.log('---something here is  und:', updatedBudgetFields )
                firestore.collection('budgets').doc(`${user}-${transaction.month}`).update(updatedBudgetFields)
                .then(function(ref) {
                   console.log('---updated to :', updatedBudgetFields )
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });    
            } else {
                // make a new budget if none exists for that transaction.month
                console.log('---made a new budget')
                budgetTemp.categories = categoryTemplate ? categoryTemplate : initialCategories
                if(!transaction.category || transaction.category === ""){
                    budgetTemp.unbudgeted = transaction.outflow;
                }else{
                    let catIdx

                    catIdx = budgetTemp.categories[transaction.header].findIndex((c) => c.name === transaction.category);
                    const updatedCategory = {
                        available:0 - transaction.outflow,
                        budgeted: 0,
                        activity: transaction.outflow,
                        name: transaction.category
                    }
                    budgetTemp.categories[transaction.header][catIdx]=updatedCategory;
                }

                firestore.collection('budgets').doc(`${user}-${transaction.month}`).set(budgetTemp)
                .then(function(docRef) {
                    console.log("Document written with ID: ");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }})    
        .catch((err)=> {
            console.log('ERROR: ', err)
        })

        firestore.collection('transactions').add({
          ...transaction,
          primaryUser: user,
          createdAt: new Date()

        }).then(() => {

            dispatch({type: 'CREATE_TRANSACTION', transaction});
        }).catch((err)=> {
            console.log('ERROR: ', err)
            dispatch({type:'CREATE_TRANSACTION_ERROR', err})
        })
    }
}

export const createAccount = (account) => {
    return (dispatch, getState, { getFirestore }) => {
        const state = getState();
        const user = state.firebase.auth.uid

        const firestore = getFirestore();
        firestore.collection('accounts').add({
          ...account,
          cleared_balance: 0,
          uncleared_balance: 0,
          workind_balance: 0
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
        const state = getState();
        const user = state.firebase.auth.uid
        const categoryTemplate = state.user.categoryTemplate
        
        const firestore = getFirestore();
        firestore.collection('budgets').doc(`${user}-${month}`).get()
        .then(function(doc) {
            if (doc.exists){
                var budget = doc.data();
                budget.month=month
                dispatch({type: 'GET_BUDGET', budget});
            } else {
                // make a new budget if none exists
                budgetTemp.categories = categoryTemplate ? categoryTemplate : initialCategories
                firestore.collection('budgets').doc(`${user}-${month}`).set(budgetTemp)
                .then(function(docRef) {
                    // budgetTemp.categories = initialCategories
                    // console.log("Document written with ID: ", docRef.id);
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

export const getTransactionByCategory = (category,id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();
        const user = state.firebase.auth.uid
    //   console.log('?????', category)
        let  transactions = []
        const firestore = getFirestore();
        firestore.collection('transactions')
        .where("primaryUser", "==", user)
        .where("category", "==", category)
        .where("month", "==", id)
        .get()
        .then(querySnapshot => {
            transactions = querySnapshot.docs.map(doc => doc.data());
            console.log(transactions);
            dispatch({type: 'GET_TRANSACTIONS_BY_CATEGORY', transactions});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
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
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid
        budget.month=month
        firestore.collection('budgets').doc(`${user}-${month}`).set(budget)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            dispatch({type: 'CREATE_BUDGET', budget});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export const updateSpendingGoal= (month, goal,budgeted,unbudgeted) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('ipdate pending goal:', goal)
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid
       
        const update = {
            goal,
            available:goal-budgeted,
            unbudgeted
        }
        firestore.collection('budgets').doc(`${user}-${month}`).update(update)
        .then(function(ref) {
            dispatch({type: 'UPDATE_GOAL'});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export const updateCategory = (month, header,idx,available, newBudgeted, oldBudgeted, activity, name, budget, goal) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {   
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid

         // update fields on the category
        const updatedCategory = {
            available:newBudgeted-activity,
            budgeted: newBudgeted,
            activity,
            name
        }
         
        const cats = budget.categories;
        const catIdx = cats[header].findIndex((c) => c.name === name);
        cats[header][catIdx]=updatedCategory;

        // updatefields on the budget
        let updatedBudgetFields={categories: cats};

        // if(newBudgeted !== oldBudgeted){
            console.log('math',budget.budgeted,oldBudgeted,newBudgeted)
            const newBB = budget.budgeted - oldBudgeted + newBudgeted;
            console.log('math:', newBB)
            
            updatedBudgetFields.budgeted = newBB;
            updatedBudgetFields.available = budget.goal - newBB;
            console.log('und?', budget.goal)
            // console.log('nan?', newBB, typeof(newBB), goal, typeof(goal))
        // }

        firestore.collection('budgets').doc(`${user}-${month}`).update(updatedBudgetFields)
        .then(function(ref) {
            budget[`categories.${header}${[idx]}`] = updatedCategory;
            dispatch({type: 'UPDATE_CATEGORY', budget, budgeted:updatedBudgetFields.budgeted, available:updatedBudgetFields.available});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export const updateCategoryName =  (month, header, idx, oldName, name, budget) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {        
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid

        const cats = budget.categories;
        const catIdx = cats[header].findIndex((c) => c.name === oldName);
        cats[header][catIdx].name = name

        let updatedBudgetFields={categories: cats};

        firestore.collection('budgets').doc(`${user}-${month}`).update(updatedBudgetFields)
        .then(function(ref) {
            dispatch({type: 'UPDATE_CATEGORY_NAME', budget, categories:cats});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export const createCategory = (month, header, name, budget) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const newCategory = {
            available:0,
            budgeted:0,
            activity:0,
            name
        }

        let cats = budget.categories
        let headerCats = budget.categories[header]
        headerCats.push(newCategory)
        cats[header] = headerCats
        const state = getState();
        const user = state.firebase.auth.uid

        firestore.collection('budgets').doc(`${user}-${month}`).update({
            categories: cats
        })
        .then(function(ref) {
            budget.categories=cats
            dispatch({type: 'CREATE_CATEGORY', budget});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

export const deleteCategory = (month, header, name, budget, catBudgeted) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid;

        const cats = budget.categories
        let headerCats = cats[header].filter((cat)=> {
            return cat.name !== name;
        })
        cats[header] = headerCats

        let budgeted = budget.budgeted;
        let available = budget.available;
        
        if(catBudgeted > 0){
            budgeted = budget.budgeted - catBudgeted;
            console.log('b.b', budget.budgeted, 'cb', catBudgeted)
            available = budget.goal - budgeted;
            console.log('cb',catBudgeted, 'b', budgeted, 'a', available)
        }

        firestore.collection('budgets').doc(`${user}-${month}`).update({
            categories: cats,
            available,
            budgeted
        })
        .then(function(ref) {
            budget.categories=cats;
            dispatch({type: 'DELETE_CATEGORY', budget, available, budgeted});
        })
        .catch(function(error) {
            console.error("Error deleting document: ", error);
        });
    }
}

const budgetTemp = {
    goal:0,
    budgeted: 0,
    available:0,
    unbudgeted:0,
    categories: initialCategories
}

