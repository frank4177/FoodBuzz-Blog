import React, { useEffect, useState, useContext } from "react";
import "./post.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import PostItem from "../postItem/PostItem";

const Post = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [relatedPost, setRelatedPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState("");
  const [updat, setUpdat] = useState([]);

  // GET POST AND RELATED POSTS
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          "https://foodbuzz.herokuapp.com/api/posts/" + id
        );

        // const related = await axios.get(
        //   `https://foodbuzz.herokuapp.com/api/posts?cat=${res.data.categories[0]}`
        // );
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setPost(res.data);
      } catch (err) {}
    };
    getPost();
  }, [id]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const re = await axios.get("https://foodbuzz.herokuapp.com/api/posts/");
        const rest = await axios.get(
          "https://foodbuzz.herokuapp.com/api/posts/" + id
        );

        setRelatedPost(rest.data);
        setUpdat(re.data);
      } catch (err) {}
    };
    getPost();
  }, [id]);

  // HANDLE DELETE
  const handleDelete = async (e) => {
    try {
      await axios.delete("https://foodbuzz.herokuapp.com/api/posts/" + id, {
        data: { username: user.username },
      });
      window.location.replace("/login");
    } catch (error) {}
  };

  // HANDLE UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put("https://foodbuzz.herokuapp.com/api/posts/" + id, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div
      className="sidebar-and-post-container-post"
      style={{ minHeight: "90vh" }}
    >
      <div className="sidebar-and-post-wrapper-post">
        <div className="post" id="lop">
          {post.username === user?.username && (
            <div className="edits">
              <AiFillEdit
                className="editicon"
                onClick={() => setUpdateMode(true)}
              />
              <AiFillDelete className="editicon" onClick={handleDelete} />
            </div>
          )}
          <div className="img-wrapper">
            <img src={post.photo} alt="" />
          </div>
          <div className="authorAndTime-wrapper">
            <div>Author: Franklin </div>
            <div>{new Date(post.createdAt).toDateString()}</div>
          </div>
          {updateMode ? (
            <div className="post-title-update-wrapper">
              <input
                type="text"
                className="post-title-update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
          ) : (
            <div className="post-title">{post.title}</div>
          )}
          {updateMode ? (
            <div className="post-desc-update-wrapper">
              <textarea
                className="post-desc-update"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                autoFocus
              />
            </div>
          ) : (
            <div className="post-desc">{post.desc}</div>
          )}
          {updateMode ? <button onClick={handleUpdate}>publish</button> : null}
          <h3 style={{ marginTop: 200 }}>Related Post:</h3>

          <div className="relatedPosts track">
            {updat.slice(0, -3).map((post, index) => {
              return post.categories.toString() ==
                relatedPost.categories.toString() ? (
                <PostItem post={post} key={index} />
              ) : null;
            })}
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Post;
