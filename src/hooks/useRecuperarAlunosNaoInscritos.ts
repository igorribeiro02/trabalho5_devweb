import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { AlunoDTO } from "../interfaces/AlunoDTO";

// Este hook depende de um ID de turma
const fetchAlunos = async (turmaId: number) => {
  const { data } = await apiClient.get<AlunoDTO[]>(
    `/alunos/nao-inscritos/turma/${turmaId}`
  );
  return data;
};

export const useRecuperarAlunosNaoInscritos = (turmaId?: number) => {
  return useQuery({
    queryKey: ["alunosNaoInscritos", turmaId],
    queryFn: () => fetchAlunos(turmaId!),
    
    // Requisito 3: Só executa a busca se a turmaId existir
    enabled: !!turmaId, 
  });
};