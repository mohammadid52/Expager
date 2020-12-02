import { useState } from 'react';

const useForm = (initialValue) => {
  const [values, setValue] = useState(initialValue);

  const handleInput = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const resetField = () => {
    setValue(initialValue);
  };
  return {
    handleInput,
    values,
    resetField,
  };
};

export default useForm;
