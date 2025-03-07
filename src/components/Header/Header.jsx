import React, { useState } from "react";
import { LogoutBtn, Container, Logo, Button } from "../index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import hamburgerIcon from "/icon-hamburger.svg";
import closeIcon from "/icon-close.svg";
import "./Header.css";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [navOpen, setNavOpen] = useState(false);

  const closeNavbar = () => setNavOpen(false);
  const toggleNavbar = () => setNavOpen(!navOpen);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-customGray/80 backdrop-blur-md border-b border-white/10">
      <Container>
        <nav className="flex items-center justify-between h-16 px-4">
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeNavbar}>
              <Logo />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <img
                src={navOpen ? closeIcon : hamburgerIcon}
                alt=""
                className="w-6 h-6"
              />
            </button>
          </div>

          <ul
            className={`md:flex md:items-center md:space-x-4 ${
              navOpen
                ? "absolute top-16 left-0 right-0 flex flex-col items-center space-y-4 py-4 bg-customGray/95 backdrop-blur-md border-b border-white/10"
                : "hidden md:flex"
            }`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      onClick={closeNavbar}
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-customBlue"
                            : "text-gray-400 hover:text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus ? (
              <li onClick={closeNavbar}>
                <LogoutBtn />
              </li>
            ) : (
              <li>
                <NavLink
                  onClick={closeNavbar}
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
