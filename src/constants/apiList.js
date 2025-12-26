import { VITE_BACKEND_URL } from "./environment";

const prefix = "/v1";
const appName = "/app";

const apiList = {
  AUTH: {
    LOGIN: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/login`,
    },
    REGISTER: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/register`,
    },
    GOOGLE_LOGIN: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/google`,
    },
    LOGOUT: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/logout`,
    },
    SYNC: {
      method: "GET",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/sync`,
    },
    ENABLE_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/enable`,
    },
    VERIFY_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/verify`,
    },
    LOGIN_VERIFY_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/login/verify`,
    },
  },
};

export default apiList;
