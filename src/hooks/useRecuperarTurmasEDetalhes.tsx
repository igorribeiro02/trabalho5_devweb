import { useQuery } from "@tanstack/react-query";
import type { Turma } from "../interfaces/Turma";
import { apiClient } from "../api/apiClient"; // 1. Usando o apiClient

// A função de busca, agora usando apiClient e esperando um ID
const recuperarTurmaEDetalhes = async (id: string) => {
  const { data } = await apiClient.get<Turma>(`/turmas/${id}`);
  return data;
};

export const useRecuperarTurmaEDetalhes = (id?: string) => { // O ID pode vir undefined
  return useQuery({
    queryKey: ["turma", id],
    queryFn: () => recuperarTurmaEDetalhes(id!), // O '!' é seguro por causa do 'enabled'
    
    // 2. A correção principal: a query só roda se o 'id' existir.
    // Isso evita a chamada com 'undefined' e corrige o bug do 'return {}'
    enabled: !!id, 
  });
};