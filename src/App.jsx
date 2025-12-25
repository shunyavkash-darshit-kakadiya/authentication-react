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
import { useEffect } from "react";
import apiList from "./constants/apiList";
import apiService from "./services/apiService";

function App() {
  const { isLoggedIn, setUserInfo } = useAuth();

  useEffect(() => {
    const sync2FAStatus = async () => {
      if (isLoggedIn === true) {
        try {
          const res = await apiService(apiList.AUTH.SYNC);
          if (res.success) {
            setUserInfo({
              twoFactorEnabled: res?.data?.twoFactorEnabled,
            });
          }
        } catch (error) {
          console.error("Failed to sync 2FA status:", error);
        }
      }
    };

    sync2FAStatus();
  }, [isLoggedIn]);

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
