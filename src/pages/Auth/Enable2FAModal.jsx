import React, { useEffect, useState } from "react";
import { useAuth } from "../../stores/useAuth";
import CommonModal from "../../components/Modal/Modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import apiService from "../../services/apiService";
import apiList from "../../constants/apiList";

const Enable2FAModal = () => {
  const [otp, setOtp] = useState("");
  const { twoFactorEnabled, setUserInfo } = useAuth();

  useEffect(() => {
    // console.log("Two-Factor Enabled Status:", twoFactorEnabled);
  }, [twoFactorEnabled]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && otp.length === 6) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    try {
      const res = await apiService(apiList.AUTH.ENABLE_2FA, { otp });
      console.log("2FA Enabled Response===>", res);
      setOtp("");
      setUserInfo({ twoFactorEnabled: true });
    } catch (error) {
      console.error("Failed to enable 2FA:", error);
    }
  };

  return (
    <CommonModal
      open={twoFactorEnabled === true}
      title="Enable Two-Factor Authentication"
    >
      <div>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Enter OTP"
            placeholder="Enter the OTP code from your authenticator app"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleVerify}
            disabled={otp.length !== 6}
          >
            Enable 2FA
          </Button>
        </Box>
      </div>
    </CommonModal>
  );
};

export default Enable2FAModal;

// import React from "react";

// const Enable2FAModal = () => {
//   return <div>Enable2FAModal</div>;
// };

// export default Enable2FAModal;
