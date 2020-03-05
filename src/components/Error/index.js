import {Field} from 'react-final-form';
import React from 'react';
const Error = ({name}) => (
  <Field
    name={name}
    subscribe={{touched: true, error: true}}
    render={({meta: {touched, error}}) => (touched && error ? <span className="invalid-feedback">{error}</span> : null)}
  />
);
export default Error;
