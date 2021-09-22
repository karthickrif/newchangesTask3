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
} from '@material-ui/core';
import { connect } from 'react-redux';
import ClientForm from '../Forms/ClientForm';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  appendClientData,
  removeClientData,
  editClientData,
  getClientData,
} from '../Action';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';

function ClientsTable(props) {
  const {
    dispatch,
    data,
    sessionData,
    clientData,
    isLoading,
    isError,
    navProgress,
    isSuccess,
  } = props;
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
    dispatch(removeClientData(obj));
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
    console.log(values, 'check');
  }
  if (
    dialogStatus.dispatchStatus != undefined &&
    dialogStatus.dispatchStatus == true
  ) {
    var clientdata = dialogStatus.dispatchValue;
    if (dialogStatus.editStatus == false) {
      dispatch(appendClientData(clientdata));
    } else {
      dispatch(editClientData(clientdata, clientdata.id));
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
    dispatch(getClientData());
  }, []);

  return (
    <>
      <TableContainer component={Paper} className="DataTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Dob</TableCell>
              <TableCell align="left">
                <IconButton onClick={handleOpen}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">
                {!isLoading ? (
                  ''
                ) : (
                  <CircularProgress className="tableProgress" />
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData != undefined && clientData.length > 0 ? (
              clientData.map((values, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{values.name}</TableCell>
                  <TableCell align="left">{values.email}</TableCell>
                  <TableCell align="left">{values.phone}</TableCell>
                  <TableCell align="left">{values.address}</TableCell>
                  <TableCell align="left">
                    {values.dob != undefined ? moment(values.dob).format('MM/DD/YYYY') : values.dob}
                  </TableCell>
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
                {dialogStatus.editStatus == true ? 'Edit Client' : 'Add Client'}
              </DialogTitle>
              <DialogContent>
                <ClientForm
                  onSubmit={showResults}
                  initialValues={clientData[dialogStatus.editIndex]}
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
          {isError.status == true && isError.message != undefined
            ? isError.message[0]
            : 'Error'}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={isSuccess != undefined && isSuccess == true}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Success!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    clientData: state.ClientReducer && state.ClientReducer.clientData,
    isLoading: state.ClientReducer && state.ClientReducer.isLoading,
    isError: state.ClientReducer && state.ClientReducer.isError,
    navProgress: state.ClientReducer && state.ClientReducer.navProgress,
    isSuccess : state.ClientReducer && state.ClientReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
