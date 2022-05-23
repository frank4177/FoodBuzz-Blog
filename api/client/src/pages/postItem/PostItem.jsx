import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link} from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="posts-container">
      <div className="posts-wrapper">
        <div>
          <div className="posts" style={{ marginRight: 20 }}>
            <Link
              to={`/post/${post._id}`}
              className="posts-img-wapper"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={post.photo} alt="" />
            </Link>
            <div className="posts-authorAndTime-wrapper">
              <div>Author: Franklin</div>
              <div>{new Date(post.createdAt).toDateString()}</div>
            </div>
            <HashLink
              to={`/post/${post._id}#lop`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="posts-title">{post.title}</div>
            </HashLink>
            <hr style={{ color: "black", width: 230 }} />
            <div className="posts-desc">{post.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
