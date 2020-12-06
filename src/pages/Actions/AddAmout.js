/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks';
import { Input } from '../../UI';
import { getWalletState, isExpense } from '../../helpers';
import { NoData } from '../../components';
import { walletActions } from '../../state/Redux';

const AddExpense = ({ wallet, onExpense }) => {
  const { uid, details, isAccountCreated } = wallet;
  const { account } = details;

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => getWalletState(state));

  const expenseInitialValue = {
    title: '',
    vendor: '',
    expenseAmt: '',
  };
  const earningsInitialValue = {
    title: '',
    vendor: '',
    earningsAmt: '',
  };

  const { values, handleInput, resetField } = useForm(
    onExpense ? expenseInitialValue : earningsInitialValue,
  );

  const { title, vendor } = values;

  const inputFieldArray = [
    {
      id: 1,
      name: 'title',
      type: 'text',
      placeholder: 'Title',
      className: 'action-field-title',
      value: title,
    },
    {
      id: 2,
      name: 'vendor',
      type: 'text',
      placeholder: isExpense('Vendor', 'Source', onExpense),
      className: 'action-field-vendor',
      value: vendor,
    },
    {
      id: 3,
      name: isExpense('expenseAmt', 'earningsAmt', onExpense),
      type: 'number',
      placeholder: isExpense('Expense', 'Income', onExpense),
      className: 'action-field-number',
      value: onExpense ? values.expenseAmt : values.earningsAmt,
    },
  ];

  const btnTxt = isExpense(null, null, onExpense);

  const addAmount = () => {
    if (onExpense) {
      if (!vendor || !values.expenseAmt) {
        NotificationManager.error('All fields are required', 'Error', 5000);
        return;
      }
    }
    if (!onExpense) {
      if (!vendor || !values.earningsAmt) {
        NotificationManager.error('All fields are required', 'Error', 5000);
        return;
      }
    }

    const data = {
      uid,
      details,
      values,
    };

    resetField();

    onExpense
      ? dispatch(walletActions.addExpenseBalance(data))
      : dispatch(walletActions.addEarnings(data));
  };

  const ActionForm = (val) => (
    <Input
      key={val.id}
      name={val.name}
      value={val.value}
      className={`${val.className} action-field`}
      type={val.type}
      placeholder={val.placeholder}
      onChange={handleInput}
      min={1}
      max={account.walletBalance}
    />
  );

  return (
    <>
      <div className={`card add-amount ${!isAccountCreated ? 'no-account-created' : ''}`}>
        {!isAccountCreated ? (
          <NoData title="Create Account to unclock this" />
        ) : (
          <>
            {map(inputFieldArray, (val) => ActionForm(val))}
            <button onClick={addAmount} disabled={loading} className="add-amount-btn" type="button">
              {loading ? 'Adding' : `Add ${btnTxt}`}
            </button>
          </>
        )}
      </div>
    </>
  );
};

AddExpense.defaultProps = {
  onExpense: false,
  wallet: [],
};

AddExpense.propTypes = {
  onExpense: PropTypes.any,
  wallet: PropTypes.shape({
    details: PropTypes.shape({
      account: PropTypes.shape({
        walletBalance: PropTypes.any,
      }),
    }),
    isAccountCreated: PropTypes.any,
    uid: PropTypes.any,
  }),
};

export default AddExpense;
