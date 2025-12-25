import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/header/Header";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import TestPage from "./pages/Test/TestPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./stores/useAuth";
import Enable2FAModal from "./pages/Auth/Enable2FAModal";

function App() {
  const { isLoggedIn } = useAuth();

  const LoggedInProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };

  const LoggedOutProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
  };

  return (
    <>
      <Router>
        {isLoggedIn && <Header />}
        <Routes>
          <Route element={<LoggedOutProtectedRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<LoggedInProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>
      </Router>
      <Enable2FAModal />
    </>
  );
}

export default App;
