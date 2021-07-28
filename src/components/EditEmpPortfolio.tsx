import axios from "axios";
import React from "react";
import {
    Button,
    Col,
    Container,
    OverlayTrigger,
    Popover,
    Row
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { portfolioUrl } from "../api/api";
import "../css/EditEmpPortfolio.css";
import AboutMe from "./AboutMe";
import CertificationContainer from "./CertificationContainer";
import EducationContainer from "./EducationContainer";
import HonorAwards from "./HonorAward";
import IndustryEquivalency from "./IndustryEquivalency";
import OtherWorkExperience from "./OtherWorkExperience";
import Project from "./Project";
import RevatureWorkExp from "./RevatureWorkExperience";

const EditEmpPortfolio = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  let savedFlags = {aboutMe: "",
  certification: "",
  education: "",
  honorsAndAwards: "",
  industryEquivalence: "",
  project: "",
  workExperience: ""};


  if (cookies.portfolio.flags) {
    savedFlags = cookies.portfolio.flags;
  }
  

  const handleBack = () => {
    removeCookie("portfolio", { maxAge: 0 });
  };

  const handleSubmit = () => {
    let obj = {
      ...cookies["portfolio"],
      submitted: true,
    };
    setCookie("portfolio", obj, { path: "/" });
    axios
      .post(`${portfolioUrl}/${cookies["portfolio"].id}`, { ...obj })
      .catch((error) => {
        console.log(error);
      });
    handleBack();
  };

  const popoverIndustryEquivalency = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Industry Equivalency Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.industryEquivalence}</Popover.Content>
    </Popover>
  );

  const popoverAboutMe = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        About Me Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.aboutMe}</Popover.Content>
    </Popover>
  );

  const popoverWorkExperience = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Work Experience Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.workExperience}</Popover.Content>
    </Popover>
  );

  const popoverProject = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Project Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.project}</Popover.Content>
    </Popover>
  );

  const popoverEducation = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Education Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.education}</Popover.Content>
    </Popover>
  );

  const popoverCertification = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Certification Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.certification}</Popover.Content>
    </Popover>
  );

  const popoverHonorsAndAwards = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Honors & Awards Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.honorsAndAwards}</Popover.Content>
    </Popover>
  );

  if (cookies.portfolio.flags) {
  return (
        <Container className="mb-5 mt-5">
      <div className="container mt-4">
        <h1>{cookies["portfolio"].name}</h1>
      </div>
      <div className="container mb-5 mt-5" id="editPortfolioButtons">
        <Link to="/list">
          <button
            className="btn btn-primary m-1"
            onClick={() => handleSubmit()}
          >
            Submit for Review
          </button>
        </Link>
        <Link to="/view">
          <button className="btn btn-primary m-1">View Portfolio</button>
        </Link>
        <Link to="/list">
          <Button
            variant="primary"
            className="m-1"
            onClick={() => handleBack()}
          >
            Back
          </Button>
        </Link>
      </div>
      <Row>
        <Col sm={11}>
          <IndustryEquivalency />
        </Col>
        <Col sm={1}>
          {savedFlags.industryEquivalence !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverIndustryEquivalency}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={11}>
          <AboutMe />
        </Col>
        <Col sm={1}>
          {savedFlags.aboutMe !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverAboutMe}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <RevatureWorkExp />
        </Col>
        <Col sm={1}>
          {savedFlags.workExperience !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverWorkExperience}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <Project />
        </Col>
        <Col sm={1}>
          {savedFlags.project !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverProject}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <EducationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.education !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverEducation}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <CertificationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.certification !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverCertification}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <HonorAwards />
        </Col>
        <Col sm={1}>
          {savedFlags.honorsAndAwards !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverHonorsAndAwards}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      </Container>
  );}
  else {
      return (
        <div>
            <div className="container mt-4">
                <h1>{cookies['portfolio'].name}</h1>
            </div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <Link to="/list">
                    <button className="btn btn-primary m-1" onClick={() => handleSubmit()}>Submit for Review</button>
                </Link>
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <Link to={{ pathname: `${portfolioUrl}/full/${cookies['portfolio'].id}` }} target="_blank" >
                    <button className="btn btn-primary m-1">Export</button>
                </Link>
                <Link to="/list">
                    <Button variant="primary" className="m-1" onClick={() => handleBack()}>Back</Button>
                </Link>
            </div>
            <IndustryEquivalency /> <br />
            <AboutMe /> <br />
            <RevatureWorkExp /> <br />
            <Project /> <br />
            <OtherWorkExperience /> <br />
            <EducationContainer /> <br />
            <CertificationContainer /> <br />
            <HonorAwards /> <br />
        </div>


      );
  }
};

export default EditEmpPortfolio;
