import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  let date = new Date().getFullYear();
  let footerStyle = {
    position: 'absolute',
    top: '100%',
    bottom: 0,
    minWidth: '100%',
  }
  return (
    <footer className="  text-center  position-relative" >
      <div className="container bg-dark " style={footerStyle}>
        <div className="row bg-dark" >
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0 text-white  p-4">© {date} ⏳, All Rights Reserved</p>
          </div>
          <div className="col-md-6 mt-4 mb-md-0">
            <div className="d-flex justify-content-center justify-content-md-center mb-4">
              <Link className="text-white text-decoration-none me-3">
                <i className="fab fa-facebook"></i> Facebook
              </Link>
              <Link className="text-white text-decoration-none me-3">
                <i className="fab fa-twitter"></i> Twitter
              </Link>
              <Link className="text-white text-decoration-none">
                <i className="fab fa-linkedin"></i> LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
