import { useAuth } from "../stores/useAuth";
import { getClientFingerprint } from "../utils/deviceInfo";

let cachedVisitorId = null;

const getVisitorId = async () => {
  if (cachedVisitorId) return cachedVisitorId;
  try {
    const fingerprint = await getClientFingerprint();
    cachedVisitorId = fingerprint.visitorId;
    return cachedVisitorId;
  } catch (error) {
    console.error("Error getting visitorId:", error);
    return null;
  }
};

const apiService = async (apiConfig, data = null) => {
  try {
    const visitorId = await getVisitorId();

    const config = {
      method: apiConfig.method,
      headers: {
        "Content-Type": "application/json",
        ...(visitorId && { "x-visitor-id": visitorId }),
      },
      credentials: "include",
    };

    if (
      data &&
      (apiConfig.method === "POST" ||
        apiConfig.method === "PUT" ||
        apiConfig.method === "PATCH")
    ) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(apiConfig.url, config);

    // Handle 401 - Check for force logout
    if (response.status === 401) {
      const result = await response.json();

      // If forceLogout is true, logout user and redirect to login
      if (result?.data?.forceLogout) {
        const { logout } = useAuth.getState();
        logout();
        window.location.href = "/login";
        throw new Error(
          result?.message || "Session expired. Please login again."
        );
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiService;
