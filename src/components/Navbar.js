import { NavLink } from 'react-router-dom';
import { FaDoorOpen, FaList } from 'react-icons/fa';

function Navbar({ auth, screen, onNavigate, onLogout }) {
  return (
    <header className="navbar navbar-expand navbar-dark bg-dark">
      <nav className="container-fluid">
        {auth && <span className="navbar-text">{auth.email}</span>}
        <ul className="navbar-nav">
          {!auth && (
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/login">
                <FaDoorOpen className='me-2' />
                Login
              </NavLink>
            </li>
          )}
          {auth && (
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/login" onClick={(evt) => onLogout(evt)}>
              <FaDoorOpen className='me-2' />
                Logout
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link d-flex align-items-center" to="/pet/list">
              <FaList className='me-2' />
              Pet List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
