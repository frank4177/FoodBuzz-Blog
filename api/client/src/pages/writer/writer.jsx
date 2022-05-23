import axios from "axios";
import React, { useContext, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { Context } from "../../context/Context";
import "./writer.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Writer = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const [title, setTittle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [uploading, setUploading] = useState("");

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setFile(selected);
    } else {
      setError(true);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const newPost = {
            title,
            desc,
            username: user.username,
            photo: downloadURL,
            categories: categories,
          };
          try {
            axios.post("https://foodbuzz.herokuapp.com/api/posts", newPost);
          } catch (errr) {}
        });
      }
    );
  };

  return (
    <div className="writer-container">
      <form action="">
        <div className="form-inputs-wrapper">
          <div className="writer-img-wrapper">
            {preview ? <img src={preview} alt="" /> : null}
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            autoFocus={true}
            className="add-title"
            onChange={(e) => setTittle(e.target.value)}
          />
          <input
            type="text"
            className="add-title"
            placeholder="category, category"
            name="categories"
            onChange={handleCat}
          />
          <div className="add-desc">
            <textarea
              placeholder="write something"
              rows="10"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <label htmlFor="fileInput">
            <AiFillPicture className="writer-icon" />
            <button type="submit" onClick={handleClick}>
              publish
            </button>
          </label>
          <div>{uploading}</div>
          {error && <p>File not supported</p>}
        </div>
      </form>
    </div>
  );
};

export default Writer;
