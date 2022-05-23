import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { MdClose} from "react-icons/md";
import { BiUserCircle} from "react-icons/bi";

import { GoThreeBars } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const [isMobile, setIsMobile] = useState(false);
  const [keyword, setKeyword] = useState();

  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };


  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <Link className="logo" to="/">
          Food<span>Buzz</span>
        </Link>

        <div className={isMobile ? "mobile-menu-wrapper" : "navbar-menus"}>
          <div className="menu" onClick={() => setIsMobile(false)}>
            Marketing
          </div>
          <div className="menu" onClick={() => setIsMobile(false)}>
            Motivational
          </div>
          <Link
            to="/writer"
            className="menu"
            onClick={() => setIsMobile(false)}
          >
            Write
          </Link>

          <form action="" onSubmit={submitHandler}>
            <input type="search" onChange={(e) => setKeyword(e.target.value)} />
            <input type="submit" value='Search' />
          </form>
          <div className="menu" onClick={handleLogout}>{user && "Logout"}</div>
          {user ? null : <Link to="/login" className="menu">Login</Link>}
          {user ? null : <Link to="/signup" className="menu">Sign Up</Link>}
        </div>

        <div className="login">
          {user && (
            <Link to="/settings">
              {user.profilePic ? <img src={user.profilePic}  alt="" /> : <BiUserCircle style={{fontSize: "50px"}}/>}
            </Link>
          )}
          <div className="menu-toggle" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? <MdClose /> : <GoThreeBars />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
