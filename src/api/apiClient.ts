import axios from "axios";

// Esta é a instância centralizada do Axios
// Todos os seus hooks vão importar 'apiClient' deste arquivo.
export const apiClient = axios.create({
  
  // Aponta para a URL base do seu back-end Spring Boot
  baseURL: "http://localhost:8080",
});