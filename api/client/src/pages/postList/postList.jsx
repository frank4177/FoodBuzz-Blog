import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const PostList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `https://foodbuzz.herokuapp.com/api/posts?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  return (
    <div className="posts-container" style={{ minHeight: "90vh" }}>
      <h1></h1>
      <div className="posts-wrapper">
        {posts.map((item, index) => (
          <div item={item} key={index}>
            <div className="posts">
              <Link
                to={`/post/${item._id}`}
                className="posts-img-wapper"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={item.photo} alt="" />
              </Link>
              <div className="posts-authorAndTime-wrapper">
                <div>Author: Franklin</div>
                <div>{new Date(item.createdAt).toDateString()}</div>
              </div>
              <Link
                to={`/post/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="posts-title">{item.title}</div>
              </Link>
              <hr style={{ color: "black", width: 230 }} />
              <div className="posts-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
