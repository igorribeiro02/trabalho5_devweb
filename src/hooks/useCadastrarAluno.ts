import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { AlunoDTO } from "../interfaces/AlunoDTO";
import type { AlunoData } from "../schemas/alunoSchema";
import { useNavigate } from "react-router-dom";

// A função que realmente faz o POST
const cadastrarAluno = async (data: AlunoData) => {
  const { data: responseData } = await apiClient.post<AlunoDTO>(
    "/alunos",
    data
  );
  return responseData;
};

export const useCadastrarAluno = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cadastrarAluno,
    onSuccess: (data) => {
      // Requisito: "exibir o Aluno cadastrado... (AlunoPage)"
      // Navegamos para a página de sucesso, passando o aluno novo como estado
      navigate("/aluno-cadastrado", { state: data });

      // Invalida queries de alunos, caso tenhamos outras listas na aplicação
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    },
    onError: (error) => {
      // Tratamento de erro (ex: exibir um toast)
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Verifique o console.");
    },
  });
};