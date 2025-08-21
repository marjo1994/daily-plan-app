import { Link } from 'react-router-dom';
import DashboardLogo from '../assets/dashboard-logo.svg';
import SearchIcon from '../assets/search-icon.svg';
import CalendarIcon from '../assets/calendar-icon.svg';
import AlertIcon from '../assets/alert-icon.svg';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={DashboardLogo} alt="Dashboard logo" />
      </Link>
      <div className="search-container">
        <input type="text" placeholder="Search your task here..." />
        <button>
          <img className="search" src={SearchIcon} alt="search icon"></img>
        </button>
      </div>
      <div className="date-navbar">
        <button>
          <img src={AlertIcon} alt="alert icon"></img>
        </button>
        <button>
          <img src={CalendarIcon} alt="calendar icon"></img>
        </button>
        <p>
          Tuesday<br></br>
          <span className="date">21/08/2025</span>
        </p>
      </div>
    </div>
  );
};
