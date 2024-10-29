import { useState, useEffect } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const isFormValid = () => {
    for (const formField of Object.keys(formValidations)) {
      const [validationFn, errorMessage] = formValidations[formField];
      if (!validationFn(formState[formField])) {
        return false;
      }
    }
    return true;
  };

  const createValidators = () => {
    const formCheckedValues = {};
    
    for (const formField of Object.keys(formValidations)) {
      const [validationFn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = validationFn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  useEffect(() => {
    createValidators();
  }, [formState]);

  return {
    ...formState,
    formState,
    onInputChange,
    ...formValidation,
    isFormValid
  };
};
