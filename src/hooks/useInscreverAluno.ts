import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface InscricaoData {
  turmaId: number;
  alunoId: number;
}

const inscreverAluno = async ({ turmaId, alunoId }: InscricaoData) => {
  await apiClient.post(`/inscricoes/turma/${turmaId}/aluno/${alunoId}`);
};

export const useInscreverAluno = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inscreverAluno,
    
    // Requisito 4: Após inscrever, atualizar a tabela E o combo de alunos
    onSuccess: () => {
      // Invalida a query da tabela (para mostrar o novo aluno)
      queryClient.invalidateQueries({ queryKey: ["inscricoes"] });
      
      // Invalida a query do combo de alunos (para remover o aluno da lista)
      queryClient.invalidateQueries({ queryKey: ["alunosNaoInscritos"] });
    },
    // Você pode adicionar onError para tratar erros de inscrição aqui
  });
};