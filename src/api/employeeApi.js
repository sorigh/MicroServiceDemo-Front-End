import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee-service/employees";

export const getAllEmployees = async () => {
  const response = await axios.get(EMPLOYEE_API_BASE_URL);
  return response.data;
};
