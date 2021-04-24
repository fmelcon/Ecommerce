import React from "react";
import "./styles.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__container">
          <a className="footer__brand" href="https://github.com/fmelcon">
            F.M design®
          </a>
          <p className="footer__name">E-Commerce Coderhouse</p>
        </div>
      </div>
      <div className="footer__line"></div>
      <div className="footer__registred">Derechos reservados a FMdesign®</div>
    </footer>
  );
};

export default Footer;
