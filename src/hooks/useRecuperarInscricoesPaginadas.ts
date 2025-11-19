import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { type InscricaoDTO } from "../interfaces/InscricaoDTO";

// 1. CERTIFIQUE-SE QUE ESTA LINHA ESTÁ AQUI:
import {type Page } from "../interfaces/Page";

const fetchInscricoes = async (turmaId: number, pagina: number) => {

  // 2. CERTIFIQUE-SE QUE O TIPO <Page<InscricaoDTO>> ESTÁ AQUI:
  const { data } = await apiClient.get<Page<InscricaoDTO>>(
    `/inscricoes/turma/${turmaId}`,
    {
      params: {
        page: pagina,
        size: 5,
        sort: "id,desc",
      },
    }
  );
  return data;
};

export const useRecuperarInscricoesPaginadas = (
  turmaId?: number,
  pagina?: number
) => {
  return useQuery({
    queryKey: ["inscricoes", turmaId, pagina],
    queryFn: () => fetchInscricoes(turmaId!, pagina!),
    enabled: !!turmaId,
    placeholderData: keepPreviousData,
  });
};