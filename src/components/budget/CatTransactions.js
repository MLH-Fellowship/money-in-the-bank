import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getTransactionByCategory } from '../../store/actions/budgetActions'

const CatTransactions = ({cat, getTransactionByCategory }) => {
    useEffect(() => {
        console.log('tran:', cat)
        getTransactionByCategory(cat);
    },[]);
    return (
        <div>
            yeah...
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const cat = ownProps.match.params.cat;
    return {
      cat
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getTransactionByCategory: (cat) => dispatch(getTransactionByCategory(cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatTransactions)
