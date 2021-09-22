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
import CasesForm from '../Forms/CasesForm';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { appendCasesData, removeCasesData, editCasesData, getCasesData} from '../Action';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import {directLogin} from '../Action';

function CasesTable(props) {
  const { dispatch, casesData, isLoading, isError, navProgress, isSuccess} = props;
  const [dialogStatus, setDialogStatus] = useState({ status: false });
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
    dispatch(removeCasesData(obj));
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
    var casesdata = dialogStatus.dispatchValue;
    if (dialogStatus.editStatus == false) {
      dispatch(appendCasesData(casesdata));
    } else {
      dispatch(editCasesData(casesdata, casesdata.id));
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
    dispatch(getCasesData());
    var locStorage = localStorage.getItem('authToken');
    if(locStorage != null && locStorage != undefined){
      dispatch(directLogin(locStorage));
    }
  }, []);
  return (
    <>
    <TableContainer component={Paper} className="DataTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Client ID</TableCell>
            <TableCell align="left">Case Title</TableCell>
            <TableCell align="left">Case Number</TableCell>
            <TableCell align="left">Claim Number</TableCell>
            <TableCell align="left">Matter ID</TableCell>
            <TableCell align="left">Date of Loss</TableCell>
            <TableCell align="left">County</TableCell>
            <TableCell align="left">State</TableCell>
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
          {casesData != undefined && casesData.length > 0 ? (
            casesData.map((values, index) => (
              <TableRow key={values.id}>
                <TableCell align="left">{values.client_id}</TableCell>
                <TableCell align="left">{values.case_title}</TableCell>
                <TableCell align="left">{values.case_number}</TableCell>
                <TableCell align="left">{values.claim_number}</TableCell>
                <TableCell align="left">{values.matter_id}</TableCell>
                <TableCell align="left">{values.date_of_loss != undefined && values.date_of_loss != null? moment(values.date_of_loss).format('MM/DD/YYYY') : values.date_of_loss}</TableCell>
                <TableCell align="left">{values.county}</TableCell>
                <TableCell align="left">{values.state}</TableCell>
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
              <TableCell align="center" colSpan={10}>
                <div>Oops! No Record Found</div>{' '}
              </TableCell>
            </TableRow>
          ) : (
            ''
          )}
          <Dialog open={dialogStatus.status} onClose={handleClose}>
            <DialogTitle>
              {dialogStatus.editStatus == true ? 'Edit Case' : 'Add Case'}
            </DialogTitle>
            <DialogContent>
              <CasesForm
                onSubmit={showResults}
                initialValues={casesData[dialogStatus.editIndex]}
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
    casesData: state.CasesReducer && state.CasesReducer.casesData,
    isLoading: state.CasesReducer && state.CasesReducer.isLoading,
    isError : state.CasesReducer && state.CasesReducer.isError,
    navProgress : state.CasesReducer && state.CasesReducer.navProgress,
    isSuccess : state.CasesReducer && state.CasesReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CasesTable);
