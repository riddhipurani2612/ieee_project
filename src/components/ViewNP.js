import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";
import "./main.css";
const Styles = styled.div``;
const ViewNP = (props) => {
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [member, setMember] = useState(false);
  const [student, setStudent] = useState(false);
  const [user, setUser] = useState({});
  const { first_name, last_name, role } = user;

  const youtubeOptions = {
    width: "100%",
    height: "400rem",
  };
  const viewdetails = () => {
    localStorage.setItem("materialId", props._id);
    history.push("/detailedview");
  };
  const updatedetails = () => {
    localStorage.setItem("materialIdUpdate", props._id);
    history.push("/updatenewsletter-publication");
  };
  const deletedetails = async () => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = axios.delete(
        `https://grssprojectserver.herokuapp.com/techMaterial/${props._id}`,
        config
      );
      console.log(response.data);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (token != null && token!= undefined) {
      try {
        let config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };
        let response = await axios.get(
          `https://grssprojectserver.herokuapp.com/user/getrole`,
          config
        );
        setUser(response.data);
        if (role === "Student") {
          setStudent(true);
        } else if (role === "Admin") {
          setAdmin(true);
        } else {
          setMember(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <Styles>
      <div className="material-content">
        <Row>
          <Col>
            {props.materialtype === "Publication" &&
            props.publicationlink != "undefined" ? (
              <a href={props.publicationlink} target="blank">
                {props.title}
              </a>
            ) : null}
            {props.materialtype === "Newsletter" &&
            props.materialfile != "undefiend" ? (
              <a href={props.materialfile} target="blank">
                {props.title}
              </a>
            ) : null}
          </Col>
          <Col xs lg="3">
            {role === "Admin" ? (
              <button className="material-button" onClick={updatedetails}>
                <i class="fa fa-edit" aria-hidden="true"></i>
              </button>
            ) : null}
            {role === "Admin" ? (
              <button onClick={deletedetails} className="material-button">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            ) : null}
          </Col>
        </Row>
      </div>
      <hr color="grey"></hr>
    </Styles>
  );
};
export default ViewNP;
