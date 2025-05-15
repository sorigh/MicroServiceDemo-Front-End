// api/addressApi.js
import axios from "axios";

const ADDRESS_API_BASE_URL = "http://localhost:8081/address-service/address";

export const getAllAddresses = async () => {
  const response = await axios.get(ADDRESS_API_BASE_URL);
  return response.data;
};
