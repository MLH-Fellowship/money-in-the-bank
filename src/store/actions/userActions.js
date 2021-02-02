export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        console.log('hey', credentials)
        firebase.auth().signInWithEmailAndPassword(
            credentials.email, credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN'})
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
        console.log('hey', credentials)
        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((res)=>{
            console.log('res', res)
            return firestore.collection('users').doc(res.user.uid).set({
                name: credentials.name,
                email: credentials.email
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