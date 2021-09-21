import React from 'react';
import '../style.css';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validation/FormValidation';
import {renderField, renderSelectField} from './validation/RenderComponents';
import { StyledLabel, StyledSubmit} from './validation/FieldComponents';

function CasesForm(props) {
  const { handleSubmit, pristine, reset, submitting, clientData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_area">
        <div className="name">
          <div className="compart">
            <StyledLabel htmlFor="clientID">Clients</StyledLabel>
            <Field name="client_id" type="input" component={renderSelectField}>
              <option>Select Any</option>
              {clientData != undefined && clientData.length > 0 ? (
                clientData.map((values) => (
                  <option value={values.id}>{values.id != undefined ? values.name : "Default"}</option>
                ))
              ) : (
                <option value="29f3a9f3-c568-4713-89c3-95b835b9f3dc">
                  Default
                </option>
              )}
            </Field>
          </div>
        </div>

        <div className="compart">
          <StyledLabel htmlFor="case_title">Case Title</StyledLabel>

          <Field name="case_title" component={renderField} type="text" />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="case_number">Case Number</StyledLabel>

          <Field name="case_number" component={renderField} type="text" />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="claim_number">Claim Number</StyledLabel>

          <Field
            name="claim_number"
            component={renderField}
            type="text"
          />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="matter_id">Matter ID</StyledLabel>

          <Field name="matter_id" type="text" component={renderField} />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="clientDOB">Date of Loss</StyledLabel>
          <Field name="date_of_loss" type="date" component={renderField} />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="county">County</StyledLabel>
          <Field name="county" type="text" component={renderField} />
        </div>

        <div className="compart">
          <StyledLabel htmlFor="state">State</StyledLabel>
          <Field name="state" type="text" component={renderSelectField}>
            <option>Select Any</option>
            <option value="CA">California</option>
            <option value="TN">Tennesse</option>
            <option value="TX">Texas</option>
          </Field>
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

CasesForm = connect(mapStateToProps, mapDispatchToProps)(CasesForm);

export default reduxForm({
  form: 'casesForm',
  validate,
})(CasesForm);
