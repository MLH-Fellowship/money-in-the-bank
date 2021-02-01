export const updateMessage = (message) => {
    return (dispatch) => { 
        dispatch({ type:'UPDATE_MESSAGE', message})
    } 
}

export const createTransaction = (transaction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //call db
        const firestore = getFirestore();
        firestore.collection('transactions').add({
            catagory:'new',
            primaryUser:'user1'
        }).then(() => {
            dispatch({type: 'CREATE_TRANSACTION', transaction});
        }).catch((err)=> {
            console.log('ERROR: ', err)
            dispatch({type:'CREATE_TRANSACTION_ERROR', err})
        })
    }
}

