const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.match('^[a-zA-Z0-9]*$') == null) {
    errors.name = 'Name fields contain only Alphabets';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter a valid Email';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  } else if (values.phone.match('^[0-9.-]*$') == null) {
    errors.phone = 'Enter valid Contact number';
  } else if (values.phone.length != 10) {
    errors.phone = 'Enter valid Contact number';
  }
  if (!values.client_id) {
    errors.client_id = 'Required';
  }
  if (!values.case_title) {
    errors.case_title = 'Required';
  }
  if (!values.case_number) {
    errors.case_number = 'Required';
  }
  if (!values.county) {
    errors.county = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.role) {
    errors.role = 'Required';
  }
  return errors;
};
export default validate;
