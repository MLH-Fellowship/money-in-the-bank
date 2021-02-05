import {initialCategories, initialDebt} from '../../initialCategories'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email, credentials.password
        ).then(() => {
            let user = firebase.auth().currentUser
            let categoryTemplate;
            let debtTemplate;
            firestore.collection('users').doc(user.uid).get()
            .then(function(doc) {
                if (doc.exists){
                    console.log('yay', doc.data())
                    categoryTemplate = doc.data().categoryTemplate;
                    debtTemplate = doc.data().debtTemplate;
                    dispatch({type: 'LOGIN', categoryTemplate, debtTemplate})
                }
            })
            .catch((err)=> {
                console.log('ERROR: ', err)
                dispatch({type:'GET_USER_ERROR', err})
            })
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT'})
        }).catch((err) => {
            dispatch({type: 'LOGOUT_ERROR', err})
        });
    }
}

export const createUser = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((res)=>{
            console.log('res', res)
            return firestore.collection('users').doc(res.user.uid).set({
                name: credentials.name,
                email: credentials.email,
                categoryTemplate: initialCategories,
                debtTemplate: initialDebt
            })
        }).then(() => {
            dispatch({type: 'LOGIN'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        });
    }
}

export const updateUser = (user) => {
    return (dispatch, getState, {getFirebase}) => {
        console.log('TODO: write update user func')
        dispatch({type: 'UPDATE_USER'})
    }
}