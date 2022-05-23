import "./App.css";
import { Home } from "./pages/home/home";
import Navbar from "../src/components/navbar/Navbar";
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signup";
import Settings from "./pages/settings/settings";
import Writer from "./pages/writer/writer";
import Post from "./pages/post/post";
import PostList from "./pages/postList/postList";
import SearchResult from "./pages/searchResult/searchResult";
import Footer from "./components/footer/footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/settings" element={user ? <Settings /> : <Login/>} />
        <Route path="/writer" element={user ? <Writer /> : <Login />} />
        <Route path="/post/:postid" element={<Post />} />
        <Route path="/posts/:cat" element={<PostList />} />
        <Route path="/search/:keyword" element={<SearchResult />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
