import { React, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
const Styles = styled.div`
  .icon {
    color: black;
  }
  .text {
    font-size: 0.8rem;
    color: white;
    line-height: 1rem;
  }
  .bottom {
    margin-bottom: 0px;
  }
`;

const Footer = (props) => {
  const [count, setCount] = useState("");
  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/counter`
      );
      if (response.data && response.statusText === "OK") {
        setCount(response.data[0].count);
      }
    } catch (err) {}
  }, []);
  return (
    <Styles>
      <footer style={{ backgroundColor: "black" }}>
        <Container>
          <Row>
            <Col xs={5}>
              <div className="text my-3">
                A non-profit organization, IEEE is the world's largest
                professional association for the advancement of technology.
                <br></br> © Copyright 2021 IEEE GRSS Gujarat Section – All
                rights reserved. Use of this Web site signifies your agreement
                to the terms and conditions.
                <br></br>Created By: Riddhi Purani &amp; Krishna Rathod
                <br></br>Support : Developed and maintained by Department of
                Computer Science Gujarat University
              </div>
            </Col>
            <Col xs={2} className="my-3">
              <span style={{ color: "white", "font-size": "1rem" }}>
                <b>IEEE-GRSS</b>
              </span>
              <a
                href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMGRS029"
                target="blank"
                style={{ color: "white" }}
              >
                <div className="mt-2" style={{ "font-size": "0.8rem" }}>
                  FAQs
                </div>
              </a>
            </Col>
            <Col xs={2} className="my-3">
              <span style={{ color: "white", "font-size": "1rem" }}>
                <b>Legal</b>
              </span>
              <div className="mt-2" style={{ color: "white" }}>
                <a
                  href="https://www.grss-ieee.org/about/membership/benefits-of-membership/"
                  target="blank"
                  style={{ color: "white", "font-size": "0.8rem" }}
                >
                  Terms and Conditions
                </a>
                <br></br>
                <a
                  href="https://www.ieee.org/security-privacy.html"
                  target="blank"
                  style={{ color: "white", "font-size": "0.8rem" }}
                >
                  Privacy policy
                </a>
                <br></br>
              </div>
              <div class="main_container" id="id_main_container">
                <div class="container_inner" id="display_div_id"></div>
              </div>
            </Col>
            <Col xs={1} className="my-3">
              <span style={{ color: "white", "font-size": "1rem" }}>
                <b>Visitors</b>
              </span>
              <div
                className="mt-2"
                style={{ color: "white", "font-size": "0.8rem" }}
              >
                {count}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </Styles>
  );
};
export default Footer;