import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignUpBiz from "./components/signUpBiz";
import CreateCard from "./components/create-card";
import ProtectedRoute from "./components/common/protected-route";
import MyCards from "./components/my-cards";
import EditCard from "./components/edit-card";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className=" flex-fill container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="signup" element={<SignUp redirect="/signin" />}></Route>
          <Route path="signin" element={<SignIn redirect="/" />}></Route>
          <Route
            path="signupbiz"
            element={<SignUpBiz redirect="/createcard" />}
          ></Route>
          <Route
            path="mycards/createcard"
            element={
              <ProtectedRoute bizOnly="true">
                <CreateCard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="mycards" element={<MyCards />}></Route>
          <Route path="mycards/editcard/:_id" element={<EditCard />}></Route>
        </Routes>
      </main>
      <footer className="bg-dark">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
