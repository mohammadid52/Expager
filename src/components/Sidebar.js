import React from 'react';
import styled from 'styled-components';
import { BsBarChart } from 'react-icons/bs';
import { GiMoneyStack, GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { CgMenuMotion } from 'react-icons/cg';
import { authActions, otherActions } from '../state/Redux';
import { getOtherValues } from '../helpers';

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

  const styles = (event) => ({
    backgroundColor: event ? 'var(--sidebar-list-bg)' : '#fff',
    color: event ? '#fff' : '#323232',
    boxShadow: event ? '0 6px 20px -10px var(--sidebar-list-bg)' : 'none',
  });

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
      <li className="menu-list" style={styles(params)}>
        <div className="menu-icon">{icon}</div>
        <div className="text">{title}</div>
      </li>
    </Link>
  );

  const iconSize = isSidebarMin ? 20 : 25;

  return (
    <Wrapper>
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
        <Logout>
          <button
            className="logout-btn"
            type="button"
            onClick={() => {
              dispatch(authActions.logOut());
            }}
          >
            <div className="text">logout</div>
            <div>
              <IoIosLogOut />
            </div>
          </button>
        </Logout>
      </div>
    </Wrapper>
  );
};
const Logout = styled.div`
  button {
    display: flex;
    text-transform: capitalize;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
    height: 40px;
    padding: 4px;
    border: none;
    outline: none;
    background: none;
    font-size: 15px;
    transition: var(--transition);
    :hover {
      background: #f4f4f2;
    }
  }
  div {
    margin: 0 4px;
  }
`;
const Wrapper = styled.div`
  .sidebar-hider {
    position: absolute;
    top: 0px;
    right: -20px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    opacity: 0.8;
    background-color: #316cd3;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
    :hover {
      transform: rotate(30deg);
    }
  }
  .sidebar-wrapper {
    transition: var(--transition-3);
    z-index: 999;
    width: var(--sidebar-width);
    background-color: #fff;
    height: 95vh;
    display: flex;
    padding: 0.5rem;
    margin-right: 1rem;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    border-radius: 20px;
    margin: 1rem;

    .logo {
      display: grid;
      place-items: center;
      grid-row-gap: 1rem;
      margin-top: 1rem;
      margin-bottom: 3rem;

      .logo-icon {
        height: 60px;
        width: 60px;
        background-color: #f5ad42;
        border-radius: 40px 40px 10px 40px;
        box-shadow: 0 12px 15px -10px #f5ad42;
        display: grid;
        place-items: center;
      }

      h3 {
        padding-left: 1rem;
        font-size: 25px;
      }
    }
    nav {
      margin-top: -50px;

      ul {
        display: grid;
        grid-template-rows: 1fr;
        grid-row-gap: 1.5rem;

        li {
          margin: 0 1rem;
          height: 50px;
          font-size: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          text-align: center;
          cursor: pointer;
          border-radius: 40px 40px 10px 40px;
          position: relative;
          color: #323232;
          letter-spacing: 1px;
          a {
          }
          div {
            padding: 0 10px;
          }
        }
      }
    }
  }
  .minified-hider {
    height: 30px;
    width: 30px;
  }

  .minified {
    width: var(--sidebar-min-width);

    padding: 1rem;
    .menu-list {
      padding: 0.2rem;
      border-radius: 50%;
      height: 43px;
    }
    .text {
      display: none;
    }

    .logout-btn {
      border-radius: 50%;
    }
    .logo-icon {
      height: 40px !important;
      width: 40px !important;
    }
  }

  .menu-list {
    transition: all 250ms ease;
  }
`;

export default Sidebar;
