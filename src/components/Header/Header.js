import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../store/slice/mode/modeSlice";
import { removeToken } from "../../store/slice/token/tokenSlice";
import { removeUser } from "../../store/slice/user/userSlice";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/scale.css";
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogOut = () => {
    dispatch(removeToken(localStorage.removeItem("token")));
    dispatch(removeUser(JSON.parse(localStorage.removeItem("user"))));
  };

  const mode = useSelector((state) => state.mode.mode);

  return (
    <div
      style={{ backgroundColor: mode ? "#111" : "#0D6EFD" }}
      className="d-flex align-items-center justify-content-between  shadow p-3"
    >
      <Link className="text-white text-decoration-none" to="/">
        LOGO
      </Link>

      <ul className="d-flex align-items-center list-unstyled p-0 m-0">
        <li>
          <Link className="text-white text-decoration-none" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-white ms-5 text-decoration-none" to="/posts">
            Posts
          </Link>
        </li>
        <li>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`btn btn-${mode ? "light" : "dark"} ms-4`}
            type="button"
          >
            Dark
          </button>
        </li>
        <li className="dropdown">
          <Tippy content='Settings' theme="light-border" animation='scale'  duration={600}>
            <button
              aria-expanded="false"
              className="btn btn-warning text-white rounded-circle p-2 ms-4 "
              data-bs-toggle="dropdown"
            >
              {user.first_name.charAt(0)} {user.last_name.charAt(0)}
            </button>
          </Tippy>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
                className="ps-0"
                onClick={handleLogOut}
                type="button"
              >
                <FiLogOut color="blue" size='25px'/> LogOut
              </button>
            </li>
            <li className="dropdown-item">
              <Link className="text-decoration-none" to="/profile"><CgProfile color="blue" size='25px'/> Settings</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
