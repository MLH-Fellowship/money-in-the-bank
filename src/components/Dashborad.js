import React from 'react'
import { connect } from 'react-redux'
import {updateMessage, createTransaction} from '../store/actions/budgetActions'

const Dashborad = ({message, updateMessage, createTransaction}) => {
    
    const update = () => {
        createTransaction('test')
        updateMessage('YAY!');
    }

    return (
        <section>
            message: {message}
            <br/>
            <button onClick={update}>UPDATE</button>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.budget.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateMessage: (message) => dispatch(updateMessage(message)),
        createTransaction: (transaction) => dispatch(createTransaction(transaction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashborad)
