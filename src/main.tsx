import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Importar o CSS do Bootstrap (como já fizemos)
import "bootstrap/dist/css/bootstrap.min.css";
// 2. Importar o JS do Bootstrap (como já fizemos)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// 3. Importar os Ícones (como já fizemos)
import "bootstrap-icons/font/bootstrap-icons.css";

// 4. Importar seu CSS customizado (para as cores)
import "./index.css";

// 5. Criar o cliente do React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 6. Disponibilizar o React Query para a aplicação */}
    <QueryClientProvider client={queryClient}>
      
      {/* 7. Carregar o Router em vez do <App /> */}
      <RouterProvider router={router} />
      
    </QueryClientProvider>
  </React.StrictMode>
);
