import React from 'react'
import { connect } from 'react-redux'
import {signOut} from '../../store/actions/userActions'
import MyAccounts from '../accountComponents/MyAccounts'

function SignedInLinks({signOut}) {

  return (
    <div>
      <ul className="right">
          <li className="right"><a onClick={signOut}>Log Out</a></li>
      </ul>
      <ul>
        <MyAccounts/>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut()),
    }
}
export default connect(null, mapDispatchToProps)(SignedInLinks)
