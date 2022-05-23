import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await axios.get(
          "https://foodbuzz.herokuapp.com/api/categories"
        );
        setCat(res.data);
      } catch (err) {}
    };
    getCat();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-categories">
        <h3>CATEGORIES</h3>
        <ul>
          {cat.map((item, index) => (
            <li item={item} key={index} className="category-items">
              <Link to={`/posts/${item.name}`} className="link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
