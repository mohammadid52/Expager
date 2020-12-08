import React from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../UI';
import { useForm } from '../../hooks';
import { walletActions } from '../../state/Redux';

const Search = () => {
  const { handleInput, values, resetField } = useForm({
    searchText: '',
  });
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(walletActions.handleSearchText(values.searchText));
  };
  const clearSearch = () => {
    resetField();
    dispatch(walletActions.handleSearchText(''));
  };
  return (
    <div className="card search-data">
      <Input
        name="searchText"
        className="search-input"
        placeholder="Search By Title, Vendor, Date, Amount"
        type="text"
        value={values.searchText}
        onChange={handleInput}
      />
      <button className="search-btn" type="button" onClick={handleSearch}>
        Search
      </button>
      <button className="search-btn clear" type="button" onClick={clearSearch}>
        Clear
      </button>
    </div>
  );
};

export default Search;
