import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthDispatch, logout, useAuthState } from "../Context";

const Nav = styled.div`
  background: #343a40;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #343a40;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    logout(dispatch);
  };

  const showSidebar = () => setSidebar(!sidebar);

  const useLogin = (token) => {
    if (Boolean(token)) {
      return (
        <Link className="nav-link" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignInAlt} /> Logout
        </Link>
      );
    } else {
      return (
        <Link to={"login"} className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      );
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="custom-sidebar-menu">
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                if (item.isPrivate && !Boolean(userDetails.token)) {
                } else {
                  return <SubMenu item={item} key={index} />;
                }
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
        <Link to={""} className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
            width="25"
            height="25"
            alt="brand"
          />{" "}
          CS Server
        </Link>
        <Nav className="navbar-right ml-auto">
          {useLogin(userDetails.token)}
        </Nav>
      </Navbar>
    </>
  );
};

export default Sidebar;
