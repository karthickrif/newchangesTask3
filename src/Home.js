import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Fade,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import CasesTable from './HomeComponents/Cases';
import UsersTable from './HomeComponents/Users';
import ClientsTable from './HomeComponents/Clients';
import { GetClientTable } from './Reducers/ClientReducer';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
var logo;
function HomePage(props) {
  const { dispatch, data, sessionData, clientNavProgress, casesNavProgress, usersNavProgress} = props;
  const [logo, setLogo] = useState({
    img: '',
    // clientcount: 0,
    // casescount: 0,
    // userscount: 0,
  });
  const [fade, setFade] = useState({
    value: true,
    gridWidth: 9,
    navWidth: 'displayClass',
  });
  const [progStatus, setProgStatus] = useState(false);

  // function getdata() {
  //   if (logo.clientcount == 0) {
      
  //   }
  //   setLogo({
  //     img: logo.img,
  //     clientcount: 1,
  //     casescount: logo.casescount,
  //     userscount: logo.userscount,
  //   });
  //   setProgStatus(true);
  //   setTimeout(() => setProgStatus(false), 2000);
  // }
  // function getCases() {
  //   if (logo.casescount == 0) {
      
  //   }
  //   setLogo({
  //     img: logo.img,
  //     clientcount: logo.clientcount,
  //     casescount: 1,
  //     userscount: logo.userscount,
  //   });
  //   setProgStatus(true);
  //   setTimeout(() => setProgStatus(false), 2000);
  // }
  // function getUsers() {
  //   if (logo.userscount == 0) {
      
  //   }
  //   setLogo({
  //     img: logo.img,
  //     clientcount: logo.clientcount,
  //     casescount: logo.casescount,
  //     userscount: 1,
  //   });
  //   setProgStatus(true);
  //   setTimeout(() => setProgStatus(false), 2000);
  // }

  function handleFade() {
    if (fade.value == true) {
      setFade({ value: false, gridWidth: 12, navWidth: 'hideClass' });
    } else {
      setFade({ value: true, gridWidth: 9, navWidth: 'displayClass' });
    }
  }

  return (
    <>
      <Router>
        <Grid container spacing={1} className="mainContainer">
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            className={fade.navWidth}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              className="Home_leftsidebar"
            >
              <Fade in={fade.value}>
                <div>
                  <Grid item>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <img
                        src={
                          sessionData != undefined
                            ? sessionData.practiceDetails.logoFile
                            : ''
                        }
                        alt="profile"
                        className="profile_img"
                      />
                      </Grid>
                      <Grid item xs={6}>
                          <Button variant="contained" className="sigin_btn">
                            {/* {!signinStatus ? (
                              'Sign in'
                            ) : (
                              <div>
                                Sign in &nbsp;
                                {<CircularProgress className="circular_progress" />}
                              </div>
                            )} */}Logout
                          </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/clients" className="homeLink">
                      <Button className="sideBarBtn">
                        Clients<KeyboardArrowRightIcon fontSize="small" className="sidebarRightIcon"/>
                        
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/cases" className="homeLink">
                      <Button className="sideBarBtn">
                        Cases<KeyboardArrowRightIcon fontSize="small" className="sidebarRightIcon"/>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/users" className="homeLink">
                      <Button className="sideBarBtn">
                        Users<KeyboardArrowRightIcon fontSize="small" className="sidebarRightIcon"/>
                      </Button>
                    </Link>
                  </Grid>
                </div>
              </Fade>
            </Grid>
          </Grid>
          <Grid
            item
            xs={fade.gridWidth}
            sm={fade.gridWidth}
            md={fade.gridWidth}
            lg={fade.gridWidth}
            xl={fade.gridWidth}
            className="gridClass"
          >
            <AppBar position="static" className="home_navBar">
              <Toolbar variant="dense" className="home_toolbar">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleFade}
                >
                  <MenuIcon />
                </IconButton>
                {clientNavProgress || casesNavProgress || usersNavProgress? (
                  <CircularProgress className="home_tableProgress" />
                ) : (
                  ''
                )}
              </Toolbar>
            </AppBar>
            <div className="GreetUser">
              Welcome{' '}
              <span className="UserName">
                {sessionData != undefined && sessionData.name != undefined
                  ? sessionData.name + '!'
                  : 'User!'}
              </span>
            </div>
            <div>&nbsp;</div>
            <Switch>
              <Route exact path="/home/clients" children={<ClientsTable />} />
              <Route exact path="/home/cases" children={<CasesTable />} />
              <Route exact path="/home/users" children={<UsersTable />} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    clientNavProgress : state.ClientReducer && state.ClientReducer.navProgress,
    casesNavProgress : state.CasesReducer && state.CasesReducer.navProgress,
    usersNavProgress : state.UsersReducer && state.UsersReducer.navProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
