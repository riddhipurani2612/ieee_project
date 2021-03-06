import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import styled from "styled-components";
import AboutView from "../components/AboutView";
import "animate.css/animate.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./main.css";
const Styles = styled.div``;
const MemberView = (props) => {
  const [viewReadMode, setViewReadMore] = useState(false);
  let name = props.first_name + " " + props.last_name;
  const [admin, setAdmin] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  let response;
  useEffect(async () => {
    if (props.about != null && props.about != "-" && props.about != "") {
      setViewReadMore(true);
      try {
        response = await axios.get(
          `https://grssprojectserver.herokuapp.com/user/getrole`,
          config
        );
        if (response.data && response.statusText === "OK")
          if (response.data.role != "Admin") {
          } else if (response.data.role.includes("Admin")) {
            setAdmin(response.data.role);
          }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const updateuser = async () => {
    localStorage.setItem("userEmailUpdate", props.email);
    history.push("/profile");
  };
  const deleteuser = async () => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = axios.delete(
        `https://grssprojectserver.herokuapp.com/user/${props.email}`,
        config
      );
      if (response.data && response.statusText === "OK") {
        console.log(response.data);
        history.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showModal, setModal] = useState(false);
  return (
    <Styles>
      <div>
        <AboutView
          show={showModal}
          closeModal={() => setModal(false)}
          onHide={() => setModal(false)}
          name={name}
          about={props.about}
        ></AboutView>
        <Card key={props.index} className="main-bg">
          {props.profile != "undefined" ? (
            <div style={{ float: "left" }}>
              <img src={props.profile} className="member-img"></img>
            </div>
          ) : (
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          )}
          <Card.Body className="member-content">
            <Card.Text>
              {props.first_name} {props.last_name}
              <br></br>
              {props.designation != "" && props.designation != undefined ? (
                <>
                  Designation : {props.designation} <br></br>
                </>
              ) : null}
              {props.workplace != "" && props.workplace != undefined ? (
                <>
                  Workplace : {props.workplace} <br></br>
                </>
              ) : null}
              {props.contact != "" && props.contact != undefined ? (
                <>
                  Contact : {props.contact} <br></br>
                </>
              ) : null}
              {props.memberid != "" && props.memberid != undefined ? (
                <>
                  Member ID : {props.memberid} <br></br>
                </>
              ) : null}
              {props.email != "" && props.email != undefined ? (
                <>
                  Email : {props.email} <br></br>
                </>
              ) : null}
              {viewReadMode && (
                <button
                  className="member-button"
                  onClick={() => setModal(true)}
                >
                  Short Biography
                </button>
              )}
              {props.detailedbio != "undefined" ? (
                <a href={props.detailedbio} target="blank">
                  <button className="member-button">Detailed Biography</button>
                </a>
              ) : null}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Styles>
  );
};
export default MemberView;
