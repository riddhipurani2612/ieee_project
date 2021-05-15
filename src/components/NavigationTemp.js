import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Image, Container } from "react-bootstrap";
import logo from "../assets/grss_logo.png";
import styled from "styled-components";
import axios from "axios";

import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
const Styles = styled.div`
  .topnav {
    background-color: #333;
    overflow: hidden;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  /* Add an active class to highlight the current page */
  .active {
    background-color: #04aa6d;
    color: white;
  }

  /* Hide the link that should open and close the topnav on small screens */
  .topnav .icon {
    display: none;
  }

  /* Dropdown container - needed to position the dropdown content */
  .dropdown {
    float: left;
    overflow: hidden;
  }

  /* Style the dropdown button to fit inside the topnav */
  .dropdown .dropbtn {
    font-size: 17px;
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }

  /* Style the dropdown content (hidden by default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  /* Style the links inside the dropdown */
  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  /* Add a dark background on topnav links and the dropdown button on hover */
  .topnav a:hover,
  .dropdown:hover .dropbtn {
    background-color: #555;
    color: white;
  }

  /* Add a grey background to dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Show the dropdown menu when the user moves the mouse over the dropdown button */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
  @media screen and (max-width: 600px) {
    .topnav a:not(:first-child),
    .dropdown .dropbtn {
      display: none;
    }
    .topnav a.icon {
      float: right;
      display: block;
    }
  }

  /* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
  @media screen and (max-width: 600px) {
    .topnav.responsive {
      position: relative;
    }
    .topnav.responsive a.icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
    .topnav.responsive .dropdown {
      float: none;
    }
    .topnav.responsive .dropdown-content {
      position: relative;
    }
    .topnav.responsive .dropdown .dropbtn {
      display: block;
      width: 100%;
      text-align: left;
    }
  }
`;
const NavigationTemp = (props) => {
  const [admin, setAdmin] = useState(false);
  const [member, setMember] = useState(false);
  const [student, setStudent] = useState(false);
  const [user, setUser] = useState({});
  const { first_name, last_name, role, profile } = user;
  let response;
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const links = (temp) => {
    if (temp === undefined) {
      return "undefined";
    } else {
      return "http://localhost:5000/" + temp;
    }
  };
  useEffect(async () => {
    try {
      response = await axios.get(`http://localhost:5000/user/getrole`, config);
      console.log(response.data);
      setUser(response.data);

      console.log(`Nav : Role : ${props.role}`);
      if (role === "Student") {
        setStudent(true);
      } else if (role === "Admin") {
        setAdmin(true);
      } else if (
        response.data.role === "Founder Member" ||
        response.data.role === "Professional Member"
      ) {
        setMember(true);
      }
    } catch (error) {
      console.log(error);
    }
    if (localStorage.getItem("token") === null) {
      props.setLogin(false);
    } else {
      props.setLogin(true);
    }
  }, [props.isLoggedIn, role]);
  const [click, setClick] = useState(false);
  const handleCilck = () => setClick(!click);

  return (
    <Styles>
      <div class="topnav" id="myTopnav">
        <a href="#home" class="active">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <div class="dropdown">
          <button class="dropbtn">
            Dropdown
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <a href="#about">About</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
          &#9776;
        </a>
      </div>
    </Styles>
  );
};
export default NavigationTemp;
