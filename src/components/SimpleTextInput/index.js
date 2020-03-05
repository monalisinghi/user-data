import React from 'react';
const SimpleTextInput = ({id, label, name, placeholder, touched, error, disabled, readonly, onChange, ...input}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        {...input}
        type="text"
        id={id}
        name={name}
        value={input.value ? input.value : ''}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        readOnly={readonly}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default SimpleTextInput;
