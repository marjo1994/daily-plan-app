import { NavLink } from 'react-router-dom';
import markIcon from '../assets/mark-icon.svg';
import checkIcon from '../assets/check-icon.svg';
import settingsIcon from '../assets/settings-icon.svg';
import taskIcon from '../assets/task-icon.svg';
import dashIcon from '../assets/dash-icon.svg';
import logOut from '../assets/logout-btn.svg';
import photo from '../assets/photo-user.jpg';

export const SideBar = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: dashIcon },
    { path: '/my-tasks', label: 'My Tasks', icon: checkIcon },
    { path: '/categories', label: 'Task Categories', icon: taskIcon },
    { path: '/settings', label: 'Settings', icon: settingsIcon },
    { path: '/help', label: 'Help', icon: markIcon },
  ];

  return (
    <div className="sidebar">
      <img className="user-photo" src={photo} alt="Picture of user" />
      <div className="user-info">
        <p className="user-name">Sundar Gurung</p>
        <p className="user-email">sundargurung360@gmail.com</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">
              <img src={item.icon} alt={item.label} />
            </span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <a className="sidebar-item" href="#">
        <span className="sidebar-icon">
          <img src={logOut} alt="Logout button" />
        </span>
        <span className="sidebar-label">Logout</span>
      </a>
    </div>
  );
};
