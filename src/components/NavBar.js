import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const firebaseConfig = {
  apiKey: "AIzaSyDYQecYPZHoszPyU_OE0YHXL6uAtJU3kBk",
  authDomain: "firesm-ae7c0.firebaseapp.com",
  projectId: "firesm-ae7c0",
  storageBucket: "firesm-ae7c0.appspot.com",
  messagingSenderId: "216544335883",
  appId: "1:216544335883:web:7f8cdf8bdd88594a53cf0e",
  measurementId: "G-ZWW2DMQN0L"
};

const app = initializeApp(firebaseConfig);
console.log("------app------", app, "------app------");
const auth = getAuth(app);
console.log("------auth------", auth, "------auth------");
const provider = new GoogleAuthProvider();
console.log("------provider------", provider, "------provider------");

getRedirectResult(auth)
  .then((result) => {
    console.log("------result------", result, "------result------");
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("------credential------", credential, "------credential------");
    const token = credential.accessToken;
    console.log("------token------", token, "------token------");
    const user = result.user;
    console.log("------user------", user, "------user------");

    if (result) {
      console.log("------result------", result, "------result------");
      auth.onAuthStateChanged((userData) => {
        console.log(
          "------userData------",
          userData.email,
          "------userData------"
        );
        const users = { Email: userData.email, Password: "abcd@0123" };
        const headers = {
          "Content-Type": "application/json",
        };
        axios
          .post("http://localhost:8080/auth0/createUser", users, { headers })
          .then((response) => {
            console.log(response);
            if (response) {
              window.location = "https://smpatel_shiv.circle.so/oauth2/callback";
            }
          })
          .catch((e) => {
            console.log("======e.message======", e, "======e.message======");
          });
      });
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log("------errorCode------", errorCode, "------errorCode------");
    const errorMessage = error.message;
    console.log(
      "------errorMessage------",
      errorMessage,
      "------errorMessage------"
    );
    const email = error.customData.email;
    console.log("------email------", email, "------email------");
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("------credential------", credential, "------credential------");
  });

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    External API
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              <div className="row">
                {!isAuthenticated && (
                  <NavItem className="mx-4">
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect()}
                      // href='https://jp_circle.circle.so/oauth2/callback'
                      // href="https://dev-ei5838on5pwyadgw.us.auth0.com/authorize?client_id=zkgmffTgLvedjA4cMqPosDIpJLOaU7Am&redirect_uri=http://localhost:3000&response_type=code&scope=openid+profile+email"
                    >
                      Continue with Auth0
                    </Button>
                  </NavItem>
                )}
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      // href='https://jp_circle.circle.so/home'
                      href="https://jp_circle.circle.so/oauth2/callback"
                    >
                      Continue with Circle
                    </Button>
                  </NavItem>
                )}
                {!isAuthenticated && (
                  <NavItem className="mx-4">
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      // href='https://jp_circle.circle.so/home'
                      onClick={() => signInWithRedirect(auth, provider)}
                    >
                      Continue with Firebase
                    </Button>
                  </NavItem>
                )}
              </div>
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    href="https://dev--53djkkq.us.auth0.com/login?state=hKFo2SBkM3Y4aGRaai1ZN1lmRS1BQ0ZNaWZkOXFoSFJ5ZEpQWqFupWxvZ2luo3RpZNkgYktxd2tUUXVwLUxNVURrbFJXNjVZQ3IwR1VVZERLTE2jY2lk2SBkT1k2V0VZalV4ODJHenFRMnJhOWxZUk9JWHl0V0JvVw&client=dOY6WEYjUx82GzqQ2ra9lYROIXytWBoW&protocol=oauth2&redirect_uri=https://jp_circle.circle.so/oauth2/callback&response_type=code&scope=openid%20profile%20email"
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
