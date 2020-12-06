import Sidebar from './Sidebar';
import Loader from './Loader';

import FloatingWallet from './FloatiingButton/FloatingWallet';
import NoData from './NoData/NoData';
import Data from './QuickData/QuickData';
import Wallet from './QuickData/QuickWallet';
import WeeklyChange from './Activity/WeeklyChange';
import MonthlyChange from './Activity/MonthlyChange';
import FormCard from './UserDetails/FormCard';
import UserGreetings from './UserDetails/UserGreetings';
import ProfilePicker from './UserDetails/ProfilePicker';
import FloatingImage from './UserDetails/FloatingImage';

const UserDetails = {
  FormCard,
  UserGreetings,
  ProfilePicker,
  FloatingImage,
};

const QuickDataCards = {
  Data,
  Wallet,
};
const Activity = {
  WeeklyChange,
  MonthlyChange,
};

export { Sidebar, Loader, FloatingWallet, NoData, QuickDataCards, Activity, UserDetails };
