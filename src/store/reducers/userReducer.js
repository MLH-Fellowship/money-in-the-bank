const initState={
    authError: null,
    categoryTemplate:{},
    debtTemplate:[]
}

const userReducer = (state=initState, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log('LOGIN success!')
            return {
                ...state,
                authError: null,
                categoryTemplate: action.categoryTemplate,
                debtTemplate: action.debtTemplate
            }
        case 'LOGOUT':
        console.log('LOGIN success!')
        return {
            ...state,
            authError: null
        }
        case 'SIGNUP':
        console.log('SIGNUP success!')
        return {
            ...state,
            authError: null
        }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.error
            }
        case 'LOGOUT_ERROR':
            return {
                ...state,
                authError: action.error
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error
            }
        default:
            return state;
    }
}

export default userReducer