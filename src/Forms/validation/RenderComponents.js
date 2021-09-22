import React from 'react';
import { StyledField, StyledSelectField, StyledCheckbox} from './FieldComponents';
import moment from 'react-moment';

export const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning },
}) => {
  return (
    <div>
      <StyledField
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error },
  children,
}) => (
  <div>
    <div>
      <StyledSelectField {...input}>{children}</StyledSelectField>
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
);


export const renderPhone = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning },
  inputProps
}) => {
  return (
    <div>
      <StyledField
        className="FormInput"
        {...input}
        type={type}
        placeholder={placeholder}
        inputProps={{maxLength : 10}}
      />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const phoneFormatter = (values) => {
  if (!values) return '';
  if (values.length == 4) {
    return values + '-';
  } else if (values.length == 8) {
    return values + '-';
  }
  console.log("validation",values)
  // const splitter = /.{1,3}/g;
  // values = values.substring(0, 10);
  // return values.substring(0, 7).match(splitter).join('-') + values.substring(7);
};

export const renderCheckbox = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning },
  inputProps
}) => {
  return (
    <>
      <StyledCheckbox
        className="FormInput"
        {...input}
        type={type}
        // color="primary"
      />
    </>
  );
};