import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import MyNavbar from "./components/Navbar";
// import LeftContent from "./components/LeftContent";
// import RightContent from "./components/RightContent";
// import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="homeBody">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="https://github.com/">Company Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://github.com/" target="_blank">
              GitHub
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/">LinkedIn</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 homeLeft">
            <h1>Greeting</h1>
            <p>Name</p>
            <p>Description</p>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ width: "18rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">title</h5>
                <p className="card-text">description</p>
                <a href="https://github.com/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
