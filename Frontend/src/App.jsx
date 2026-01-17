import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuestionPage from "./components/QuestionPage";
import JobBoard from "./components/JobBoard";


export default function App() {
  return (
      <div className="min-h-screen bg-white text-gray-800">
        <div className="mb-15">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/question-flow" element={<QuestionPage />} />
          <Route path="/job-board" element={<JobBoard />} />
          {/* <Route path="/:search" element={<Search />} /> */}


          <Route path="/user/login" element = {<Login />} />
          <Route path="/user/signup" element = {<Signup />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-semibold text-blue-600">
                  404 – Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
  );
}
