import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import {type  Turma } from "../interfaces/Turma";

// Esta função busca os detalhes de UMA turma
const fetchTurma = async (turmaId: number) => {
  const { data } = await apiClient.get<Turma>(`/turmas/${turmaId}`);
  return data;
};

export const useRecuperarTurmaPorId = (turmaId?: number) => {
  return useQuery({
    queryKey: ["turma", turmaId],
    queryFn: () => fetchTurma(turmaId!),
    // Só executa a busca se a turmaId existir
    enabled: !!turmaId, 
  });
};