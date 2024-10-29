
import React from "react";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";

export const Footer = (props) => {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="#" target="_blank">
                  VitalSave
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Creador: Luis - Dev.
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, EL MEJOR{" "}
              <i className="fa fa-heart heart" />
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
