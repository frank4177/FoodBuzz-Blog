import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { AiFillPicture } from "react-icons/ai";
import "./settings.css";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Settings = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState("");
  const { user, dispatch } = useContext(Context);

  //HANDLE IMAGE PREVIEW
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
      console.log(selected);
    } else {
      setError(true);
    }
  };

  // HANDLE DELETE
  const handleDelete = async (e) => {
    try {
      await axios.delete(
        "https://foodbuzz.herokuapp.com/api/users/" + user._id,
        {
          data: { userId: user._id },
        }
      );
      dispatch({ type: "LOGOUT" });
      window.location.replace("/login");
    } catch (error) {}
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
          const updateUser = {
            userId: user._id,
            email,
            password,
            username,
            profilePic: downloadURL,
          };
          try {
            axios.put(
              "https://foodbuzz.herokuapp.com/api/users/" + user._id,
              updateUser
            );
          } catch (error) {}
        });
      }
    );
  };

  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        <div className="settings-header">
          <h1>Update your accout</h1>
          <h5 onClick={handleDelete}>Delete Account</h5>
        </div>

        <form action="">
          <h4>Profile Picture</h4>
          <div className="PP-wrapper">
            <img src={file ? preview : user.profilePic} alt="" />

            <label htmlFor="fileInput">
              <AiFillPicture className="PP-icon" />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
            {error && <p>File not supported</p>}
          </div>
          <div className="settings-inputs">
            <div>
              <div>Username</div>
              <input
                type="text"
                className="setting-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <div>Email</div>
              <input
                type="text"
                className="setting-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div>Password</div>
              <input
                type="text"
                className="setting-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleClick}>Save</button>
          <div>{uploading}</div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
