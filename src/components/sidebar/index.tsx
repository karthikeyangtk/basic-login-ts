import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import { routes } from "../routes";

/**
 * Contain side bar
 * @module Sidebar
 */
export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="side-bar">
      <Nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky"></div>
        {routes.map((route, index) => {
          return (
            <NavItem key={index}>
               <NavLink onClick={() => navigate(route.path)}>
                {route?.name}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
}
