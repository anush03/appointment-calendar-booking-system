import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../App.css";
import { IconContext } from "react-icons";

function Navbar() {
  //   const [sidebar, setSidebar] = useState(false);

  //   const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          {/* <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
        </div>
        {/* <nav className={sidebar ? "nav-menu active" : "nav-menu"}> */}
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                {/* <AiIcons.AiOutlineClose /> */}
                <IoIcons.IoMdPeople />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
