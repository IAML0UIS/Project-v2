import React from "react";
import { useDispatch } from "react-redux";
import routes from "../routes";
import { useState } from "react";
import { starLogout } from "../store/auth/thunks";
import { useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Container, Button, Input } from "reactstrap";
import { FaSignOutAlt } from 'react-icons/fa';




export const DemoNavbar = (props) => {
 
  const dispatch = useDispatch()  
  const onLogout = () => {
    dispatch( starLogout() );
  }

  const [color, setColor] = useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();


  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  
  return (
    
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      
        <div>
            
        </div>
      <NavbarBrand href="/">{getBrand()}
          </NavbarBrand>
          <Button color="danger" onClick={ onLogout }>
                <FaSignOutAlt style={{ marginRight: '6px' }} />
                Logout
          </Button>
    </Navbar>
  );
};


