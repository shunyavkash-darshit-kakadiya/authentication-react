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
  },
};

export default apiList;
