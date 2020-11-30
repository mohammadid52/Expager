import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherValues, getLoader } from '../../helpers';
import { useForm } from '../../hooks';
import { walletActions } from '../../state/Redux';
import { Input } from '../../UI';
import './Dashboard.css';

const Dashboard = ({ data: { uid, details, isDataLoaded, isAccountCreated } }) => {
  const { values, handleInput, resetField } = useForm({
    number: 1,
  });

  const dispatch = useDispatch();

  const { isSidebarMin } = useSelector((state) => getOtherValues(state));
  const { loading } = useSelector((state) => getLoader(state));

  const handleCreateWalletAccount = () => {
    const data = {
      uid,
      detailsData: details,
      walletBalanceValue: values.number,
    };
    dispatch(walletActions.createWalletAccount(data));
  };

  return (
    <Wrapper className={`${isSidebarMin ? 'maxified-content' : ''} content`}>
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-container">
        <div className="left-side">
          {isDataLoaded && !isAccountCreated && (
            <>
              {' '}
              <p className="small-heading">Add Balance</p>
              <div className="card add-wallet-bal">
                <h4 className="add-bal-title">Create New Wallet Account</h4>
                <div className="form">
                  <Input
                    type="number"
                    name="number"
                    value={values.number}
                    onChange={handleInput}
                    min={1}
                    max={999999}
                    className="input-number"
                  />
                  <div className="min-max-values">
                    <p className="min-bal">Min: 1</p>
                    <p className="max-bal">Max: 999999</p>
                  </div>
                  <div className="dashboard-actions">
                    <button
                      disabled={loading}
                      type="button"
                      onClick={() => resetField('number', 'number')}
                    >
                      reset
                    </button>
                    <button disabled={loading} type="button" onClick={handleCreateWalletAccount}>
                      {loading ? 'creating' : 'add'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="right-side">
          <p className="small-heading">wallet</p>
          <div className="card add-wallet-bal">
          <h4 className="add-bal-title">Add Wallet balance</h4>
        </div>
        </div> */}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default Dashboard;
