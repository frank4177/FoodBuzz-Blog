import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPinterest,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
          <div className="footer-wrapper">
        <div className="vof">
          <Link className="logo" to="/">
            Food<span>Buzz</span>
          </Link>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis nesciunt, soluta modi ut mollitia illum inventore{" "}
          </p>
          <div className="icons-container">
            <AiFillFacebook className="icons" style={{ color: "blue" }} />
            <AiFillInstagram className="icons" style={{ color: "red" }} />
            <AiFillTwitterSquare
              className="icons"
              style={{ color: "skyblue" }}
            />
            <BsPinterest className="icons" style={{ color: "red" }} />
          </div>
        </div>

        <div className="my-acct">
          <ul className="my-acct-menus">
            <li>
             <span>My Account</span>
            </li>
            <li>
            
              <span>Tip Cooks</span>
            </li>
            <li>
            
              <span>No Sugars Recipes</span>
            </li>
            <li>
            
              <span>Bananas</span>
            </li>
            <li>
            
              <span>Say Ahh!</span>
            </li>
          </ul>
        </div>

        <div className="info">
          <div className="my-info-menus">
            <li>
              <span>Return</span>
            </li>
            <li>
              <span>Affiliate</span>
            </li>
            <li>
              <span>Privacy Policy</span>
            </li>
            <li>
              <span>Terms & Conditions</span>
            </li>
            <li>
              <span>Contact Us</span>
            </li>
          </div>
        </div>

      </div>
      </div>
      <div className="copyright">
        <h5>Ⓒ 2022 All Rights Reserved FoodBlog</h5>
        </div>
      
    </>
  );
};

export default Footer;
