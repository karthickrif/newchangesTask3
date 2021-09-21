import React from 'react';
export const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning },
}) => {
  return (
    <div>
      <input
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
      <select {...input}>{children}</select>
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
}) => {
  return (
    <div>
      <input
        className="FormInput"
        {...input}
        type={type}
        placeholder={placeholder}
        maxLength="12"
      />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};
export const phoneFormatter = (number) => {
  if (!number) return '';
  if (number.length == 4) {
    return number + '-';
  } else if (number.length == 8) {
    return number + '-';
  }
  // const splitter = /.{1,3}/g;
  // number = number.substring(0, 10);
  // return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};
