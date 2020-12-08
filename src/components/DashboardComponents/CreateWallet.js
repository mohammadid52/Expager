import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../UI';
import { getWalletState } from '../../helpers';
import { useForm } from '../../hooks';
import { walletActions } from '../../state/Redux';

const CreateWallet = ({ data }) => {
  const dispatch = useDispatch();
  const { uid, details } = data;

  const { loading } = useSelector((state) => getWalletState(state));
  const { values, handleInput, resetField } = useForm({
    number: '',
  });

  const handleCreateWalletAccount = () => {
    const dataToCreateWallet = {
      uid,
      details,
      walletBalanceValue: values.number,
    };

    dispatch(walletActions.createWalletAccount(dataToCreateWallet));
  };
  return (
    <>
      <div className="card add-wallet-bal">
        <h6 className="add-bal-title">Create New Wallet Account</h6>
        <div className="form">
          <Input
            type="number"
            name="number"
            value={values.number}
            onChange={handleInput}
            placeholder="Initial Balance"
            min={1}
            max={999999}
            className="input-number"
          />
          <div className="min-max-values">
            <p className="min-bal">Min: 1</p>
            <p className="max-bal">Max: 999999</p>
          </div>
          <div className="dashboard-actions">
            <button className="reset-field" disabled={loading} type="button" onClick={resetField}>
              reset
            </button>
            <button
              className="create-field"
              disabled={loading}
              type="button"
              onClick={handleCreateWalletAccount}
            >
              {loading ? 'creating' : 'create'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWallet;
