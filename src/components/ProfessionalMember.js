import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import MemberView from "../components/MemberView";
import "./main.css";
const Styles = styled.div``;
const ProfessionalMembers = () => {
  const [members, setMembers] = useState([]);
  const {
    first_name,
    last_name,
    role,
    address,
    contact,
    email,
    workplace,
    designation,
    about,
  } = members;
  const [userabout, setAbout] = useState(false);
  useEffect(async () => {
    let response;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const role = "Professional Member";
    try {
      response = await axios.get(
        `https://grssprojectserver.herokuapp.com/user/getmembers/${role}`,
        config
      );
      setMembers(response.data);
      if (response.data.about != null) {
        setAbout(true);
        console.log(`About ${about}`);
      } else {
        console.log(`About null`);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const links = (temp) => {
    if (temp === undefined) {
      return "https://grssprojectserver.herokuapp.com/profile.png";
    } else {
      return "https://grssprojectserver.herokuapp.com/" + temp;
    }
  };

  return (
    <Styles>
      <div className="main-bg">
        <Container>
          <br></br>
          <div className="w3-panel w3-border w3-border-white boxshadow">
            <div className="member-header">Professional Members</div>
            <br></br>
            <div>
              <Row>
                {members.map((memberObj, index) => (
                  <Col sm="4">
                    <MemberView
                      first_name={memberObj.first_name}
                      last_name={memberObj.last_name}
                      workplace={memberObj.workplace}
                      contact={memberObj.contact}
                      email={memberObj.email}
                      emails={memberObj.emails}
                      about={memberObj.about}
                      profile={links(memberObj.profile)}
                      memberid={memberObj.memberid}
                      designation={memberObj.designation}
                      index={index}
                    ></MemberView>
                  </Col>
                ))}
              </Row>
            </div>
            <br></br>
          </div>
        </Container>
        <br></br>
      </div>
    </Styles>
  );
};
export default ProfessionalMembers;
