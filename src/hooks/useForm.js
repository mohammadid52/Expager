import { useState } from 'react';

const useForm = (initialValue) => {
  const [values, setValue] = useState(initialValue);

  const handleInput = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const resetField = (fieldName, type) => {
    const resetValue = type === 'number' ? 1 : '';
    setValue({ ...values, [fieldName]: resetValue });
  };
  return {
    handleInput,
    values,
    resetField,
  };
};

export default useForm;
