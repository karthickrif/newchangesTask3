import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function StyledSnackBar() {
  return (
    <>
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
export default StyledSnackBar;
