import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MainUserSpecific from './components/userViews/MainUserSpecific'
import MainUserAll from './components/userViews/MainUserAll'
import CreateTransaction from './components/accountComponents/CreateTransaction'
import CreateAccount from './components/accountComponents/CreateAccount'
import BudgetView from './components/budget/BudgetView'
import CatTransactions from './components/budget/CatTransactions'
import { connect } from 'react-redux'

function App({auth}) {
  const {uid} = auth

  return (
    <BrowserRouter>
      <div className="App grid-container paddingTop">
        <div className="item1">
          <header>
            <Navbar/>
          </header>
        </div>
        <div className="item2">
          <Switch>
            <Route exact path='/' component={BudgetView}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
            <Route path='/login' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/mainuserspecific' component={MainUserSpecific}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
            <Route path='/mainuserall' component={MainUserAll}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
            <Route path='/createtransaction' component={CreateTransaction}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
            <Route path='/createaccount' component={CreateAccount}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
            <Route path='/cat/:cat' component={CatTransactions}>
              {!uid && <Redirect to={"/login"}/>}
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);