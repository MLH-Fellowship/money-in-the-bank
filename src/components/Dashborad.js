import React from 'react'
import { connect } from 'react-redux'
import {updateMessage, createTransaction} from '../store/actions/budgetActions'

const Dashborad = () => {
    return (
        <section>
            You are logged in
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashborad)