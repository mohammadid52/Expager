import Sidebar from './Sidebar/Sidebar';
import Loader from './Other/Loader';
import Guide from './Other/Guide';
import SortData from './Other/SortData';
import FloatingWallet from './FloatingButton/FloatingWallet';
import NoData from './NoData/NoData';
import Data from './QuickData/QuickData';
import Wallet from './QuickData/QuickWallet';
import WeeklyChange from './Activity/WeeklyChange';
import MonthlyChange from './Activity/MonthlyChange';
import FormCard from './UserDetails/FormCard';
import UserGreetings from './UserDetails/UserGreetings';
import ProfilePicker from './UserDetails/ProfilePicker';
import FloatingImage from './UserDetails/FloatingImage';
import CreateWallet from './DashboardComponents/CreateWallet';
import DailyChangesGraph from './DashboardComponents/DailyChangesGraph';

const DashboardComponents = {
  CreateWallet,
  DailyChangesGraph,
};

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

export {
  Sidebar,
  Loader,
  FloatingWallet,
  NoData,
  QuickDataCards,
  DashboardComponents,
  Activity,
  UserDetails,
  Guide,
  SortData,
};
