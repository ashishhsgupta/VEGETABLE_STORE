import React, { useEffect, useState } from "react";
import imgURL from "../images/veggie.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { Modal, Button } from "react-bootstrap";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import { FaTimes } from "react-icons/fa";
import axios from "axios";


const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [formdata, setFormData] = useState({
    phone:"",
    otp:""
  })

  const [otpSent, setOtpSent] = useState(false);
  //const [otp, setOtp] = useState("");

  const [error, setError] = useState({});

  const inputChange = (e) => {
    const {name } = e.target;
    const inputValue = e.target.value.replace(/\D/g,"");
    setFormData({...formdata, [name]: inputValue});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //const userRole = {...formdata, role}
    const validationError = {};

    if(!formdata.phone.trim()){
      validationError.phone = "Please enter your phone number"
    } else if(formdata.phone.trim().length < 10){
      validationError.phone = "Phone number should be 10 digits"
    }
    setError(validationError);
    if(Object.keys(validationError).length === 0){
    try{
      const response = await axios.post(`http://localhost:4002/vegies/v1/api/sendOTP`,{
        phone:formdata.phone,
      })
      console.log('phone:', response)
      if(response.status === 201){
        setOtpSent(true);
        alert("OTP send to your Mobile no.")
      }
    } catch(error){
        console.log("loginpage:", error?.response);
        if(error?.response?.status === 401){
          alert("Internal error");
        }else{
          alert('Please Enter valid number:', + (error?.response?.data?.message || error.message));
        }
      }
    }
  }

  const handleVerifyOtp = async(e) => {
    e.preventDefault();
    const validationError = {};
    if(!formdata.otp || formdata.otp.trim().length === 0){
      validationError.otp = "Please enter the OTP";
    }
    setError(validationError);
    if(Object.keys(validationError).length === 0){
      try{
        const response = await axios.post(`http://localhost:4002/vegies/v1/api/verifyOTP`, {
          phone: formdata.phone,
          otp: formdata.otp
        });
        if(response.status === 200){
          alert("OTP verified successfully");
        }
      }catch(error){
         console.error("OTP verification error:", error),
         alert(error?.response?.data?.message || "Something went wrong while verify OTP");
      }
    }
  };
  return (
    <>
      <div className="containerFluid bg-warning">
        <div className="col d-flex justify-content-between align-items-center ps-5 w-100">
          <div className="row-lg-2">
            <img
              src={imgURL}
              alt="img"
              className="img-fluid headerTopImg mb-2 mt-2"
            />
          </div>

          <div className="row-lg-4 d-flex">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search items"
              aria-label="Search"
            />
         
          <div className="col-lg-2">
            <button type="button" className="btn btn-light">
              <i className="fas fa-search"></i>
            </button> </div>
          </div>
          <div className="row-lg-2">
            <Link to={"/#"} className="right">
              <button
                type="button"
                className="btn btn-primary position-relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Link>
          </div>
          <div className="userLogin col-lg-2 text-white">
            <TooltipWrapper tooltipText="Sign-in" placement="bottom">
              <FaCircleUser
                size={40}
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
              />
            </TooltipWrapper>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="md" centered>
        <Modal.Header className="position-relative">
          <Modal.Title>
            <p className="fs-5">Sign-up/Sign-in with your phone number.</p>
          </Modal.Title>
          <FaTimes onClick={handleClose} className="modalBtn" />{" "}
        </Modal.Header>

        <Modal.Body>
          <div className="row modalHeader">
         <form onSubmit={otpSent ? handleVerifyOtp : handleSubmit}>
          <div className="mb-3">
           <label htmlFor="inputEmail" className="form-label">Enter your phone number</label>
           <input type="text" onChange={inputChange} value={formdata.phone} disabled={otpSent} className="form-control" id="inputEmail"
           name="phone" aria-describedby="phoneNumber" placeholder="Phone no." maxLength={10}/>
          </div>
          {otpSent && (
            <div className="mb-3">
              <label htmlFor="otpInput" className="form-label">Enter OTP</label>
              <input type="text" className="form-control" id="otpInput" name="otp" value={formdata.otp || ""}
              onChange={inputChange}
              placeholder="Enter OTP" />
            </div>
          )}
          <button type="submit" className="form-control btn btn-danger">{otpSent ? "Verify OTP" : "Send OTP"}</button>
          {error.phone && (<div className="error-msg">{error.phone}</div>)}
          {error.otp && (<div className="error-msg">{error.otp}</div>)}
          <div className="mb-5 pt-4">By signing up, you agree to our <Link>privacy policy and terms of conditions</Link> of use.</div>
         </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
