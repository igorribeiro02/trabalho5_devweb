import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { Turma } from "../interfaces/Turma";

// Este hook depende de um ID de disciplina
const fetchTurmas = async (disciplinaId: number) => {
  const { data } = await apiClient.get<Turma[]>(
    `/turmas/disciplina/${disciplinaId}`
  );
  return data;
};

export const useRecuperarTurmasPorDisciplina = (disciplinaId?: number) => {
  return useQuery({
    queryKey: ["turmas", disciplinaId],
    queryFn: () => fetchTurmas(disciplinaId!), // O '!' é seguro por causa do 'enabled'
    
    // Requisito 2: Só executa a busca se a disciplinaId existir
    enabled: !!disciplinaId, 
  });
};