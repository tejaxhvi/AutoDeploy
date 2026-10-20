const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

export async function getUserFromToken(token) {

  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("Response from Backend", data);

    return data;
  } catch (err) {
    throw new Error("Backend is Down !", err);
  }
}
