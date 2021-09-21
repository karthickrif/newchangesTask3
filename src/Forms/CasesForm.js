import React from 'react';
import '../style.css';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validation/FormValidation';
import {renderField, renderSelectField} from './validation/RenderComponents';

function CasesForm(props) {
  const { handleSubmit, pristine, reset, submitting, clientData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_area">
        <div className="name">
          <div className="compart">
            <label htmlFor="clientID">Clients</label>
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
          <label htmlFor="case_title">Case Title</label>

          <Field name="case_title" component={renderField} type="text" />
        </div>

        <div className="compart">
          <label htmlFor="case_number">Case Number</label>

          <Field name="case_number" component={renderField} type="text" />
        </div>

        <div className="compart">
          <label>Claim Number</label>

          <Field
            name="claim_number"
            component={renderField}
            type="text"
          />
        </div>

        <div className="compart">
          <label htmlFor="matter_id">Matter ID</label>

          <Field name="matter_id" type="text" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="clientDOB">Date of Loss</label>
          <Field name="date_of_loss" type="date" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="county">County</label>
          <Field name="county" type="text" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="state">State</label>
          <Field name="state" type="text" component={renderSelectField}>
            <option>Select Any</option>
            <option value="CA">California</option>
            <option value="TN">Tennesse</option>
            <option value="TX">Texas</option>
          </Field>
        </div>
      </div>
      <div className="button_area">
        <button
          className="FormButtons"
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
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
