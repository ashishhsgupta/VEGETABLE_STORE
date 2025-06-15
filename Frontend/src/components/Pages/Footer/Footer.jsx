import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import fbImg from "../images/F_B.png";
import yTube from "../images/yt.png";
import twitter from "../images/tw.png";
import linkedin from "../images/ldin.png";
import ScrollTop from "../import-pages/ScrollTop";
import { ABOUT_PATH, CONTACTUS_PATH, DELIVERY_STATUS_PATH, FAQ_PATH, SUPPORT_PATH } from "../Router/Router-Constant";

const Footer = () => {
  return (
    <div className="footerMainContainer bg-dark">
      <div className="container text-light footerContainer">
        <div className="row footerSocialMedia">
          <div className="col-sm-3">
            <h4 className="text-warning">Eat Green, Live Green - </h4>
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
                <Link to="#">Fruit</Link>
              </li>
              <li>
                <Link to="#">Exotic Fruit</Link>
              </li>
              <li>
                <Link to="#">Vegetable</Link>
              </li>
              <li>
                <Link to="#">Exotic Vegetable</Link>
              </li>
              <li>
                <Link to="#">Salad items</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 footerLink">
            <h5 className="footerTitle">Quick Links</h5>
            <ul className="">
              <li>
                <Link to={ABOUT_PATH}>About Us</Link>
              </li>
              {/* <li>
                <Link to="/services">Services</Link>
              </li> */}
              <li>
                <Link to={CONTACTUS_PATH}>Contact Us</Link>
              </li>
              <li>
                <Link to={FAQ_PATH}>FAQ's</Link>
              </li>
              <li>
                <Link to={SUPPORT_PATH}>Support</Link>
              </li>
               <li>
                <Link to={DELIVERY_STATUS_PATH}>Delivery status</Link>
              </li>
            </ul>
          </div>
             <ScrollTop />
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
