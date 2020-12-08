import React from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { otherActions } from '../../state/Redux';

const { Option } = Select;

const SortData = () => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(otherActions.sortBy(value));
  };

  return (
    <div className="sort-data">
      <Select defaultValue="Newest First" onChange={handleChange} style={{ width: 150 }}>
        <Option value="newest">Newest First</Option>
        <Option value="oldest">Oldest First</Option>
      </Select>
    </div>
  );
};

export default SortData;
