import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashborad'
import Navbar from './components/layout/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MainUserSpecific from './components/userViews/MainUserSpecific'
import MainUserAll from './components/userViews/MainUserAll'
import CreateTransaction from './components/accountComponents/CreateTransaction'
import CreateAccount from './components/accountComponents/CreateAccount'
import BudgetView from './components/budget/BudgetView'
import { connect } from 'react-redux'

function App({auth}) {
  const {uid} = auth

  return (
    <BrowserRouter>
      <header>
        <Navbar/>
      </header>
      <Switch>
        <Route exact path='/' component={Dashboard}>
          {!uid && <Redirect to={"/login"}/>}
        </Route>
        <Route exact path='/budget' component={BudgetView}>
          {!uid && <Redirect to={"/login"}/>}
        </Route>
        <Route path='/login' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/mainuserspecific' component={MainUserSpecific}/>
        <Route path='/mainuserall' component={MainUserAll}/>
        <Route path='/createtransaction' component={CreateTransaction}/>
        <Route path='/createaccount' component={CreateAccount}/>
      </Switch>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);