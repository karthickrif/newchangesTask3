import React, { useState, useEffect } from 'react';
import './style.css';
import LoginPage from './Login';
import HomePage from './Home';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ClientsTable from './HomeComponents/Clients';
import {directLogin} from './Action';
var route;
var snack;
var locStorage;
function App(props) {
  const { dispatch, data, sessionData, authStatus} = props;
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    locStorage = localStorage.getItem('authToken');
    if(locStorage != null && locStorage != undefined){
      dispatch(directLogin(locStorage));
      // console.log('redirect to home',locStorage);
    }
  },[])

  useEffect(() => {
    if (sessionData != undefined) {
      setRedirect(true);
    }else{
      setRedirect(false);
    } 
  });
  function handleClose() {
    // setSnackStatus(false);
  }
  if (redirect) {
    return (
      <>
        <Router>
          <Route exact path="/home" children={<HomePage />} />
          <Redirect from="/login" to="/home" />
          {/* <Route exact path="/home/clients" children={<ClientsTable />} /> */}
        </Router>
        <Snackbar
          open={authStatus != undefined && authStatus == 'success' && redirect}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
        >
          <MuiAlert severity="success" elevation={6} variant="filled">
            Successfly Logged
          </MuiAlert>
        </Snackbar>
      </>
    );
  } else{
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/login" children={<LoginPage />} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
        <Snackbar
          open={authStatus != undefined && authStatus == 'failed' && !redirect}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
        >
          <MuiAlert severity="error" elevation={6} variant="filled">
            Sign In Failed
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    authStatus: state.LoginReducer && state.LoginReducer.authStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
