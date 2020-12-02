import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks';
import { Input } from '../../UI';
import { getWalletState } from '../../helpers';
import { walletActions } from '../../state/Redux';

const AddExpense = ({ wallet }) => {
  const { uid, details } = wallet;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => getWalletState(state));

  const { values, handleInput, resetField } = useForm({
    title: '',
    vendor: '',
    expenseAmt: 1,
  });
  const { title, expenseAmt, vendor } = values;
  const inputFieldArray = [
    {
      id: 1,
      name: 'title',
      type: 'text',
      placeholder: 'Title',
      className: 'expense-field-title',
      value: title,
    },
    {
      id: 2,
      name: 'vendor',
      type: 'text',
      placeholder: 'Vendor',
      className: 'expense-field-vendor',
      value: vendor,
    },
    {
      id: 3,
      name: 'expenseAmt',
      type: 'number',
      placeholder: 'Expense Amount',
      className: 'expense-field-number',
      value: expenseAmt,
    },
  ];
  const addExpense = () => {
    const data = {
      uid,
      detailsData: details,
      expenseData: values,
    };

    resetField();
    dispatch(walletActions.addExpenseBalance(data));
  };

  return (
    <>
      <div className="card add-expense">
        {map(inputFieldArray, (val) => (
          <Input
            key={val.id}
            name={val.name}
            value={val.value}
            className={`${val.className} expense-field`}
            type={val.type}
            placeholder={val.placeholder}
            onChange={handleInput}
          />
        ))}
        <button onClick={addExpense} disabled={loading} className="add-expense-btn" type="button">
          {loading ? 'Adding' : 'Add Expense'}
        </button>
      </div>
    </>
  );
};

export default AddExpense;
