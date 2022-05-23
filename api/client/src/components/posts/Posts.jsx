import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Newsletter from "../newsletter/newsletter";

const Posts = () => {
  const [morePost, setMorePost] = useState(6);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setMorePost(morePost + morePost);
  };

  const slice = posts.slice(0, morePost);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://foodbuzz.herokuapp.com/api/posts");
        setPosts(res.data);
        setLoading(true);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <div className="posts-container" id="lop">
      {loading ? (
        <div className="posts-wrapper">
          {slice.map((item) => (
            <div item={item} key={item.id}>
              <div className="posts">
                <Link
                  className="posts-img-wapper"
                  to={`/post/${item._id}`}
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
      ) : (
        <div class="lds-roller" style={{ margin: "0 auto" }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <button onClick={() => loadMore()}>More Posts</button>
      <Newsletter />
    </div>
  );
};

export default Posts;
