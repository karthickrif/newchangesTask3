import React from 'react';
import { reduxForm, Field } from 'redux-form';
import '../style.css';
import { connect } from 'react-redux';
import validate from './validation/FormValidation';
import {renderField, renderSelectField} from './validation/RenderComponents';
import { StyledLabel, StyledSubmit} from './validation/FieldComponents';
import {MenuItem,Checkbox} from '@material-ui/core';

function UsersForm(props) {
  const { handleSubmit, pristine, reset, submitting, usersData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="main">
        <div className="compart">
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <Field name="name" type="text" component={renderField} />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <Field name="email" component={renderField} type="email" />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <Field name="password" component={renderField} type="text" />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="role">Role</StyledLabel>
          <Field name="role" component={renderSelectField} type="select">
            <MenuItem>Select Any</MenuItem>
            <MenuItem value="lawyer">Attorney</MenuItem>
            <MenuItem value="paralegal">Non-Attorney</MenuItem>
          </Field>
        </div>

        <div className="compart">
          <StyledLabel htmlFor="isAdmin">Admin</StyledLabel>
          <Field name="is_admin" component={Checkbox} type="checkbox" format={v => v === 1}  normalize={v => v ? 1 : 0} />
        </div>
      </div>
      
      <div className="button_area">
        <StyledSubmit
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </StyledSubmit>
      </div>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    usersData: state.ClientReducer && state.ClientReducer.usersData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

UsersForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);

export default reduxForm({
  form: 'usersForm',
  validate
})(UsersForm);
