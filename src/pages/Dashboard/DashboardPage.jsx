import React from "react";
import { useAuth } from "../../stores/useAuth";

const DashboardPage = () => {
  const { userInfo } = useAuth();
  console.log("User Info in DashboardPage===>", userInfo);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
