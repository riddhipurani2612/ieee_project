import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Container, Form, ProgressBar, Alert } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./main.css";
const Styles = styled.div``;
const AddMaterial = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [file, setFile] = useState("");
  const [checkFile, setCheckFile] = useState(false);
  const [progress, setProgess] = useState(0);
  const el = useRef(); // accesing input element
  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file
    console.log(file);
    const extension = file.name.split(".").pop() + "";
    if (extension === "pdf") {
      setFile(file); // storing file
      setCheckFile(true);
    } else {
      setStatus("Warning");
      alert(`${extension} file is not allowed`);
      e.target.value = null;
     }
  };

  const [material, setMaterial] = useState({});
  const { title, about, youtubelink, publicationlink, materialtype } = material;

  const valueChanged = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    if (file === undefined) {
      setCheckFile(false);
    }
    const token = localStorage.getItem("token");
    console.log(materialtype);
    if (checkFile) {
      e.preventDefault();
      let formData = new FormData();
      formData.append("title", title);
      formData.append("about", about);
      formData.append("youtubelink", youtubelink);
      formData.append("materialtype", materialtype);
      formData.append("file", file);
      console.log(token);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "x-auth-token": token,
        },
      };
      let response;
      try {
        response = await axios.post(
          "https://grssprojectserver.herokuapp.com/techMaterial",
          formData,
          config,
          {
            onUploadProgress: (ProgressEvent) => {
              let progress =
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%";
              setProgess(progress);
            },
          }
        );
        if (response.statusText === "OK") {
          setStatus("Success");
        } else {
          setStatus("Warning");
          setError(response.data.message);
        }
      } catch (err) {
        console.log(err.response);
        console.log(err.request);
        console.log(err.message);
      }
    } else {
      e.preventDefault();
      let data = {
        title,
        about,
        youtubelink,
        materialtype,
        publicationlink,
      };
      console.log(data);
      let config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      let response;
      try {
        response = await axios.post(
          "https://grssprojectserver.herokuapp.com/techMaterial",
          data,
          config
        );
        if (response.statusText === "OK") {
          setStatus("Success");
        } else {
          setStatus("Warning");
          setError(response.data.message);
        }
     } catch (err) {
        console.log(err.response);
      }
    }
  };
  useEffect(async () => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    if (token === null) {
      history.push("/");
    }
    try {
      const response = await axios.get(
        `https://grssprojectserver.herokuapp.com/user/getrole`,
        config
      );
      console.log(response.data);
      if (response.data.role.includes("Student")) {
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Styles>
      <Container className="main-bg">
        <br></br>
        <div className="form-box w3-panel w3-border w3-border-white boxshadow">
          <div className="material-header">Add Lecture</div>
          <br></br>
          <div class="material-form">
            <form onSubmit={submit}>
              <Form.Group>
                <Row>
                  <Col sm="4">
                    <label>Lecture Type : </label><span style={{color : "red"}}>*</span>
                  </Col>
                  <Col>
                    <select
                      required
                      class="w3-select"
                      name="materialtype"
                      value={materialtype}
                      onChange={valueChanged}
                      required
                    >
                      <option value="">-- Select Lecture Type --</option>
                      <option>Distinguished Lecture Program</option>
                      <option>Expert Lecture Program</option>
                    </select>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm="4">
                    <label>Title : </label><span style={{color : "red"}}>*</span>
                  </Col>
                  <Col>
                    <input
                      placeholder="Enter Title"
                      class="w3-input w3-animate-input"
                      type="text"
                      name="title"
                      value={title}
                      onChange={valueChanged}
                      required
                    ></input>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm="4">
                    <label>About : </label><span style={{color : "red"}}>*</span>
                  </Col>
                  <Col>
                    <input
                      placeholder="More about lecture"
                      class="w3-input w3-animate-input"
                      type="text"
                      name="about"
                      value={about}
                      onChange={valueChanged}
                      required
                    ></input>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm="4">
                    <label>YouTube Link : </label>
                  </Col>
                  <Col>
                    <input
                      placeholder="Enter URL"
                      class="w3-input w3-animate-input"
                      type="url"
                      name="youtubelink"
                      value={youtubelink}
                      onChange={valueChanged}
                    ></input>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm="4">
                    <label>Upload File : </label>
                  </Col>
                  <Col>
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={el}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <br></br>
              </Form.Group>
              {checkFile && (
                <ProgressBar now={progress} label={`${progress}%`} />
              )}
              <button
                className="material-button"
                style={{
                  width: "100%",
                  padding: "14px 28px",
                  "font-size": "16px",
                  cursor: "pointer",
                }}
              >
                Add Lecture
              </button>
            </form>
          </div>
        </div>
        <br></br>
      </Container>
    </Styles>
  );
};
export default AddMaterial;
