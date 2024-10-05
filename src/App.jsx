import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />{" "}
          {/* Home view to list all users */}
          {/* <Route path="/user/:userId" element={<UserDetail />} />{" "} */}
          {/* Detailed view for each user */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
