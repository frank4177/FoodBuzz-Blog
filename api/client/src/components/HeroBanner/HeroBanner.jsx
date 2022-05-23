import React from "react";
import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="herobanner-container">
      <div className="herobanner-wrapper">
        <img
          className="img2"
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3RwMjIyLWJsb2diYW5uZXItMDYtMzA0LmpwZw.jpg"
          alt=""
        />

        <img
          className="img1"
          src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdHAyMjItdHdpdHRlcnBvc3QtMDktcGYtczMtcGYtczUxLXBmLXM2MC5qcGc.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroBanner;
