import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import fbImg from "../images/F_B.png";
import yTube from "../images/yt.png";
import twitter from "../images/tw.png";
import linkedin from "../images/ldin.png";

const Footer = () => {
  return (
    <div className="bg-dark">
      <div className="container text-light footerContainer">
        <div className="row footerSocialMedia">
          <div className="col-sm-3">
            <h4 className="text-warning">Eat Fresh, Live Fresh - </h4>
          </div>

          <div className="col-sm-3">
            <h6>Join with us also social-media</h6>
            <div className="d-flex align-items-center gap-2 footerSocialImg">
              <img
                src={fbImg}
                alt="img"
                className="img-fluid"
                style={{ width: "40px" }}
              />
              <img
                src={yTube}
                alt="img"
                className="img-fluid"
                style={{ width: "40px" }}
              />
              <img
                src={twitter}
                alt="img"
                className="img-fluid"
                style={{ width: "40px" }}
              />
              <img
                src={linkedin}
                alt="img"
                className="img-fluid"
                style={{ width: "40px" }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 footerLink">
            <h5 className="footerTitle">About US</h5>
            <p className="aboutUsContent">
              Fresh Vegetable is a preferred farm fresh fruits & vegetable store
              in Mumbai, Navi Mumbai. Buy vegetables & fruits online at Best
              rates. We are Providing Vegetables and Fruits Home Delivery in
              Mumbai, Navi Mumbai.
            </p>
          </div>
          <div className="col-sm-3 footerLink">
            <h5 className="footerTitle">Contact Us</h5>
            <p>Email: fvej@gmail.com</p>
            <p>Phone no: 1234567890</p>
            <p>Address: Sector 512, Shop no. 54, Mumbai pin: 123456</p>
          </div>
          <div className="col-sm-3 footerLink">
            <h5 className="footerTitle">Product Category</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/fruit">Fruit</Link>
              </li>
              <li>
                <Link to="/exotic-fruit">Exotic Fruit</Link>
              </li>
              <li>
                <Link to="/vegetable">Vegetable</Link>
              </li>
              <li>
                <Link to="/exotic-vegetable">Exotic Vegetable</Link>
              </li>
              <li>
                <Link to="/salad-items">Salad items</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 footerLink">
            <h5 className="footerTitle">Quick Links</h5>
            <ul className="">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </div>

          <hr />
          <p className="text-center">
            All rights are reserved with us- Copyright © 2024-2026 Supermarket
            Vegetables and Fruits
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
