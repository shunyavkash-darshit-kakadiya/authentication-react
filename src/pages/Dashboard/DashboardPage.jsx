import React from "react";
import { useAuth } from "../../stores/useAuth";

const DashboardPage = () => {
  const { await2FA } = useAuth();
  console.log("await2FA==>", await2FA);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
