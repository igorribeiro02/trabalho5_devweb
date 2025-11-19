import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import AlunosPage from "../pages/AlunosPage";
import TurmasPage from "../pages/TurmasPage";
import AlunosPorTurmaPage from "../pages/AlunosPorTurmaPage";
import TurmaDetalhesHome from "../components/TurmaDetalhesHome";

import InscricaoPage from "../pages/InscricaoPage";
import CadastroDeAlunosPage from "../pages/CadastroDeAlunosPage";
import AlunoPage from "../pages/AlunoPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":idTurma?",
            element: <TurmaDetalhesHome />,
          },
        ],
      },
      { path: "listar-alunos", element: <AlunosPage /> },
      { path: "listar-alunos-por-turma", element: <AlunosPorTurmaPage /> },
      { path: "listar-turmas", element: <TurmasPage /> },
      { path: "turmas/:id/inscricao", element: <InscricaoPage /> },
      {
        path: "cadastrar-aluno", // Rota da Parte 1
        element: <CadastroDeAlunosPage />,
      },
      {
        path: "aluno-cadastrado", // Rota de sucesso da Parte 1
        element: <AlunoPage />,
      },
      {
        path: "inscricao", // Rota da Parte 2 (a principal)
        element: <InscricaoPage />,
      },
    ],
  },
]);
export default router;
