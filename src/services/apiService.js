import { useAuth } from "../stores/useAuth";

const apiService = async (apiConfig, data = null) => {
  try {
    const config = {
      method: apiConfig.method,
      headers: {
        "Content-Type": "application/json",
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

    if (response.status === 401 || response.status === 403) {
      const result = await response.json();

      // If session is invalid, logout the user
      if (result?.sessionInvalid || result?.deviceRemoved) {
        const { logout } = useAuth.getState();
        logout();
        window.location.href = "/login";
        throw new Error(
          "Session expired or device removed. Please login again."
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
