import React from 'react';
import { reduxForm, Field } from 'redux-form';
import '../style.css';
import { connect } from 'react-redux';
import validate from './validation/FormValidation';
import {
  renderField,
  renderPhone,
  phoneFormatter,
} from './validation/RenderComponents';
import { StyledLabel, StyledSubmit} from './validation/FieldComponents';
import Moment from 'react-moment';

function ClientForm(props) {
  const { handleSubmit, pristine, reset, submitting, clientData } = props;
  return (
    <form onSubmit={handleSubmit} className="clientsForm">
      <div className="input_area">
        <div className="compart">
          <div className="clientName">
            <StyledLabel htmlFor="clientName">Client Name</StyledLabel>
            <Field
              name="name"
              type="text"
              placeholder="Stephen"
              component={renderField}
            />
          </div>
        </div>

        <div className="compart">
          <StyledLabel htmlFor="clientEmail">Email</StyledLabel>

          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder="stephen@gmail.com"
          />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="clientPhone">Phone</StyledLabel>

          <Field
            name="phone"
            component={renderPhone}
            type="text"
            placeholder="9999-999-999"
            maxLength="12"
            format={phoneFormatter}
            // normalize={normalizePhone}
          />
        </div>

        <div className="compart">
          <StyledLabel>Address</StyledLabel>

          <Field
            name="address"
            component={renderField}
            type="text"
            placeholder="Downtown lane,CA"
          />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="dob">D.O.B</StyledLabel>
          <div>
            <Field
              name="dob"
              type="date"
              component={renderField}
            />
          </div>
        </div>
      </div>
      <div className="button_area">
        <StyledSubmit type="submit" disabled={pristine || submitting}>
          Submit
        </StyledSubmit>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    clientData: state.ClientReducer && state.ClientReducer.clientData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

ClientForm = connect(mapStateToProps, mapDispatchToProps)(ClientForm);

export default reduxForm({
  form: 'clientForm',
  validate,
  asyncBlurFields: ['firstName'],
})(ClientForm);
