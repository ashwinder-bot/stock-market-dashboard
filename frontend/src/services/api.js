const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function getStocks() {
  const response = await fetch(`${API_URL}/stocks`);
  return response.json();
}
