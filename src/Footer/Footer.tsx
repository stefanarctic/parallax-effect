import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__section">
            <h3 className="footer__title">Pizza Delight</h3>
            <p className="footer__description">
              Delivering hot, fresh pizzas straight to your door. Quality
              ingredients, authentic flavors, and exceptional service.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__links">
              <li>123 Pizza Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@pizzadelight.com</li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Hours</h4>
            <ul className="footer__links">
              <li>Mon - Thu: 11am - 11pm</li>
              <li>Fri - Sat: 11am - 12am</li>
              <li>Sunday: 12pm - 10pm</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 Pizza Delight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

