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
