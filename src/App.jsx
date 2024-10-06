import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Homepage = lazy(() => import("./pages/Homepage"));
const UserDetail = lazy(() => import("./pages/UserDetail"));

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Home view to list all users */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Homepage />
              </Suspense>
            }
          />
          {/* Detailed view for each user */}
          <Route
            path="/user/:userId"
            element={
              <Suspense fallback={<Loader />}>
                <UserDetail />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
