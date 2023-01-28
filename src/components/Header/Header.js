import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../store/slice/mode/modeSlice";
import { removeToken } from "../../store/slice/token/tokenSlice";
import { removeUser } from "../../store/slice/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogOut = () => {
    dispatch(removeToken(localStorage.removeItem("token")));
    dispatch(removeUser(JSON.parse(localStorage.removeItem("user"))));
  };

  const mode = useSelector((state) => state.mode.mode);

  return (
    <div  style={{backgroundColor: mode ? '#111' : '#0D6EFD'}}  className='d-flex align-items-center justify-content-between  shadow p-3'>
      <Link className="text-white" to="/">
        LOGO
      </Link>

      <ul className="d-flex align-items-center list-unstyled p-0 m-0">
        <li>
          <Link className="text-white" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-white ms-5" to="/posts">
            Posts
          </Link>
        </li>
        <li>
          <button onClick={() => dispatch(toggleDarkMode())} className={`btn btn-${mode ?'light' : 'dark'} ms-4`} type="button">
            Dark
          </button>
        </li>
        <li className="dropdown">
          <button
            aria-expanded="false"
            className="btn btn-warning text-white rounded-circle p-2 ms-4 "
            data-bs-toggle="dropdown"
          >
            {user.first_name.charAt(0)} {user.last_name.charAt(0)}
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
                className="ps-0" onClick={handleLogOut} type='button'
              >
                LogOut
              </button>
            </li>
            <li className="dropdown-item">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
