import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Form from '../Form/Form';

const AuthForm = ({ onSubmit, submitButtonText, fields }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(...Object.values(formData));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          id={field.name}
          type={field.type}
          value={formData[field.name] || ''}
          onChange={handleChange}
          required
          minLength={field.minLength}
          name={field.name}
        />
      ))}
      <Button type="submit">{submitButtonText}</Button>
      {error && <ErrorMessage message={error} />}
    </Form>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    minLength: PropTypes.number
  })).isRequired
};

export default AuthForm;
