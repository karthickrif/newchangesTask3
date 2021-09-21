import React, { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Checkbox,
} from '@material-ui/core';
import { connect } from 'react-redux';
import UsersForm from '../Forms/UsersForm';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {appendUserData, removeUserData, editUserData, getUsersData,} from '../Action';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function UsersTable(props) {
  const { dispatch, usersData, isLoading, isError, navProgress } =
    props;
  const [dialogStatus, setDialogStatus] = useState({
    status: false,
    editStatus: false,
  });
  const [delayRow, setdelayRow] = useState(false);

  const handleOpen = () => {
    setDialogStatus({ status: true, editStatus: false });
  };

  const handleClose = () => {
    setDialogStatus({
      status: false,
    });
  };

  function handleDelete(obj) {
    dispatch(removeUserData(obj));
  }

  function handleEdit(obj) {
    setDialogStatus({
      status: true,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: true,
      editIndex: obj,
    });
  }

  function showResults(values, dispatch) {
    setDialogStatus({
      status: false,
      dispatchStatus: true,
      dispatchValue: values,
      editStatus: dialogStatus.editStatus,
      editIndex: dialogStatus.editIndex,
    });
  }

  if (
    dialogStatus.dispatchStatus != undefined &&
    dialogStatus.dispatchStatus == true
  ) {
    var userdata = dialogStatus.dispatchValue;
    if (dialogStatus.editStatus == false) {
      dispatch(appendUserData(userdata));
    } else {
      dispatch(editUserData(userdata, userdata.id));
    }
    setDialogStatus({
      status: false,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: false,
    });
  }

  setTimeout(() => {
    setdelayRow(true);
  }, 2000);

  useEffect(() => {
    dispatch(getUsersData());
  }, []);
  return (
    <>
    <TableContainer component={Paper} className="DataTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Admin</TableCell>
            <TableCell align="left">
              <IconButton onClick={handleOpen}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TableCell>
            <TableCell align="left">
              {!isLoading ? '' : <CircularProgress className="tableProgress" />}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData != undefined && usersData.length > 0 ? (
            usersData.map((values, index) => (
              <TableRow key={index}>
                <TableCell align="left">{values.name}</TableCell>
                <TableCell align="left">{values.email}</TableCell>
                <TableCell align="left">{values.role}</TableCell>
                <TableCell align="left"><Checkbox checked={values.is_admin == 1 ||values.is_admin ? true : false}/></TableCell>
                <TableCell align="left">
                  <IconButton id={index} onClick={() => handleEdit(index)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    id={index}
                    onClick={() => handleDelete(values.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : delayRow == true && !navProgress ? (
            <TableRow>
              <TableCell align="center" colSpan={7}>
                <div>Oops! No Record Found</div>{' '}
              </TableCell>
            </TableRow>
          ) : (
            ''
          )}
          <Dialog open={dialogStatus.status} onClose={handleClose}>
            <DialogTitle>
              {dialogStatus.editStatus == true ? 'Edit User' : 'Add User'}
            </DialogTitle>
            <DialogContent>
              <UsersForm
                onSubmit={showResults}
                initialValues={usersData[dialogStatus.editIndex]}
              />
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar
    open={isError != undefined && isError.status == true}
    autoHideDuration={5000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    onClose={handleClose}
  >
    <MuiAlert severity="error" elevation={6} variant="filled">
      {isError.status == true && isError.message != undefined ? isError.message[0] : 'Error'}
    </MuiAlert>
  </Snackbar>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    // data: state.LoginReducer && state.LoginReducer.loginData,
    // sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    usersData: state.UsersReducer && state.UsersReducer.usersData,
    isLoading: state.UsersReducer && state.UsersReducer.isLoading,
    navProgress: state.UsersReducer && state.UsersReducer.navProgress,
    isError : state.UsersReducer && state.UsersReducer.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
