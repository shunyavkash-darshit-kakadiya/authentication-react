import { getClientFingerprint } from "../utils/deviceInfo";
import { useAuth } from "../stores/useAuth";

let cachedVisitorId = null;

const getVisitorId = async () => {
  if (cachedVisitorId) return cachedVisitorId;

  try {
    const fingerprint = await getClientFingerprint();
    cachedVisitorId = fingerprint?.visitorId || null;
    return cachedVisitorId;
  } catch (error) {
    console.error("Fingerprint error:", error);
    return null;
  }
};

const apiService = async (apiConfig = {}, data = null) => {
  if (!apiConfig?.url || !apiConfig?.method) {
    throw new Error("API config must include url and method");
  }

  try {
    const visitorId = await getVisitorId();

    const headers = {
      "Content-Type": "application/json",
      ...(visitorId && { "x-visitor-id": visitorId }),
    };

    const fetchConfig = {
      method: apiConfig.method.toUpperCase(),
      headers,
      credentials: "include",
    };

    if (data && ["POST", "PUT", "PATCH"].includes(fetchConfig.method)) {
      fetchConfig.body = JSON.stringify(data);
    }

    const response = await fetch(apiConfig.url, fetchConfig);

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    const result = isJson ? await response.json() : null;

    if (response.status === 401) {
      if (result?.data?.forceLogout) {
        const authStore = useAuth.getState();
        authStore.logout();

        window.location.replace("/login");
      }

      const error = new Error(result?.message || "Unauthorized access");
      error.status = 401;
      error.data = result?.data;
      throw error;
    }

    if (!response.ok) {
      throw new Error(
        result?.message || result?.error || `API Error (${response.status})`
      );
    }

    return result;
  } catch (error) {
    console.error("API Service Error:", error);
    throw error;
  }
};

export default apiService;
