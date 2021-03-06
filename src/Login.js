import React, { useState, useEffect } from 'react';
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { GetLoginData} from './Action';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function LoginPage(props) {
  const { dispatch, data, sessionData, signinStatus} = props;
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    reactivation_token: false,
  });

  function getLoginValues(e) {
    let email;
    let password;
    if (e.target.id == 'email') {
      setLoginData({
        email: e.target.value,
        password: loginData.password,
        reactivation_token: false,
        snackStatus: loginData.snackStatus
      });
    } else {
      setLoginData({
        email: loginData.email,
        password: e.target.value,
        reactivation_token: false,
        snackStatus: loginData.snackStatus
      });
    }
  }
  function passLoginData() {
    loginData != undefined
      ? dispatch(GetLoginData(loginData))
      : alert('Check entered values');
  }
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
          <Paper className="login_paper" >
            <Typography component="h3" className="login_text">
              Get Started with Reactify
            </Typography>
            <FormControl className="loginFormControl">
              <OutlinedInput
                id="email"
                className="login_fields"
                type="text"
                onChange={getLoginValues}
                endAdornment={
                  <InputAdornment position="end">
                    <MailOutline fontSize="small" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className="loginFormControl">
              <OutlinedInput
                type="password"
                id="password"
                className="login_fields"
                onChange={getLoginValues}
                endAdornment={
                  <InputAdornment position="end">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={passLoginData}
              className="sigin_btn"
            >
              {!signinStatus ? (
                'Sign in'
              ) : (
                <div>
                  Sign in &nbsp;
                  {<CircularProgress className="circular_progress" />}
                </div>
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    signinStatus : state.LoginReducer && state.LoginReducer.signinStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
