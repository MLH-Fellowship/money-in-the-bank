import {initialCategories} from '../../initialCategories'

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

<<<<<<< HEAD
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

=======
>>>>>>> 588e08b... Create, update and delete budget categories
export const getBudget = (month) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState();
        const user = state.firebase.auth.uid
        console.log('user',user)
        const firestore = getFirestore();
        let categoryHeaders;
        firestore.collection('budgets').doc(`${user}-${month}`).get()
        .then(function(doc) {
            if (doc.exists){
                var budget = doc.data();
                budget.month=month
                // console.log(Object.keys(budget.categories))
                categoryHeaders = Object.keys(budget.categories).sort()
                dispatch({type: 'GET_BUDGET', budget, categoryHeaders});
            } else {
                // make a new budget if none exists
                firestore.collection('budgets').doc(`${user}-${month}`).set(budgetTemp)
                .then(function(docRef) {
                    budgetTemp.month=month
                    categoryHeaders = Object.keys(budgetTemp).sort()
                    console.log("Document written with ID: ", docRef.id);
                    dispatch({type: 'CREATE_BUDGET', budget: budgetTemp, categoryHeaders});
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
<<<<<<< HEAD
=======

export const updateCategory = (month, header,idx,available, budgeted, activity, name, budget) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('cc')
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid
        console.log('UPDATE from ACTIONS')
        const updatedCategory = {
            available,
            budgeted,
            activity,
            name
        }
        const cats = budget.categories
        const catIdx = cats[header].findIndex((c) => c.name === name);
        cats[header][catIdx]=updatedCategory
        console.log('cats!!!', cats)
        firestore.collection('budgets').doc(`${user}-${month}`).update({
            categories: cats
        })
        .then(function(ref) {

            // const state = getState();
            // const budget = state.budget.budget
            budget[`categories.${header}${[idx]}`] = updatedCategory
            console.log("Document updated with ID: ", ref);

            dispatch({type: 'UPDATE_BUDGET', budget});
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
        headerCats.sort((a, b) => (a.name > b.name ? 1 : -1));

        console.log('cats!!!', headerCats)
        
        cats[header] = headerCats
        // console.log('cats!!!', cats[header], typeof cats[header])
        // cats[header].sort((a, b) => (a.name > b.name ? 1 : -1))
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

export const deleteCategory = (month, header, name, budget) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        const user = state.firebase.auth.uid

        const cats = budget.categories
        let headerCats = cats[header].filter((cat)=> {
            return cat.name !== name
        })
        cats[header] = headerCats
        console.log('del cats!!!', cats)
        firestore.collection('budgets').doc(`${user}-${month}`).update({
            categories: cats
        })
        .then(function(ref) {
            budget.categories=cats
            dispatch({type: 'DELETE_CATEGORY', budget});
        })
        .catch(function(error) {
            console.error("Error deleting document: ", error);
        });
    }
}

const budgetTemp = {
    balance:60,
    budgeted: 1800,
    funds:2260,
    previous_overspent:0,
    categories: initialCategories
}
>>>>>>> 588e08b... Create, update and delete budget categories
