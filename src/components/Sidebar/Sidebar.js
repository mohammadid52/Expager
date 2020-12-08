/* eslint-disable no-restricted-globals */
import React from 'react';
import { BsBarChart } from 'react-icons/bs';
import { GiMoneyStack, GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { CgMenuMotion } from 'react-icons/cg';
import './Sidebar.css';
import { authActions, otherActions } from '../../state/Redux';
import { getOtherValues } from '../../helpers';

const Sidebar = () => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onDashboard = pathname === '/dashboard';
  const onHome = pathname === '/';
  const onHistory = pathname === '/history';
  const onEarnings = pathname === '/earnings';
  const onExpenses = pathname === '/expenses';
  const onProfile = pathname === '/profile';

  const styles = (event) => (event ? 'sidebar-selected-menu' : 'not-selected');

  const menuList = [
    {
      to: '/',
      id: 1,
      params: onDashboard || onHome,
      icon: <BsBarChart />,
      title: 'Dashboard',
    },
    {
      to: '/earnings',
      id: 3,
      params: onEarnings,
      icon: <GiReceiveMoney />,
      title: 'Earnings',
    },
    {
      to: '/expenses',
      id: 4,
      params: onExpenses,
      icon: <GiPayMoney />,
      title: 'Expenses',
    },
    {
      to: '/history',
      id: 2,
      params: onHistory,
      icon: <GiMoneyStack />,
      title: 'History',
    },
    {
      to: '/profile',
      id: 5,
      params: onProfile,
      icon: <BiUserCircle />,
      title: 'My Profile',
    },
  ];

  const renderMenuList = ({ id, to, params, icon, title }) => (
    <Link key={id} to={to}>
      <li className={`menu-list ${styles(params)}`}>
        <div className="menu-icon">{icon}</div>
        <div className="text">{title}</div>
      </li>
    </Link>
  );

  const iconSize = isSidebarMin ? 20 : 25;

  return (
    <div className={`sidebar-wrapper card ${isSidebarMin ? 'minified' : ''}`}>
      <button
        type="button"
        className="sidebar-hider"
        onClick={() => dispatch(otherActions.switchSidebar())}
      >
        <CgMenuMotion size={iconSize} />
      </button>

      <Link to="/">
        <button type="button" className="logo">
          <div className="logo-icon">
            <FaMoneyBillWave color="#fff" size={iconSize} />
          </div>
          <div>
            <h3 className="text">Expager</h3>
          </div>
        </button>
      </Link>
      <nav>
        <ul>{map(menuList, (list) => renderMenuList(list))}</ul>
      </nav>

      <button
        className="logout-btn"
        type="button"
        onClick={() => {
          dispatch(authActions.logOut());
        }}
      >
        <div className="text">logout</div>
        <div className="logout-icon">
          <IoIosLogOut />
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
