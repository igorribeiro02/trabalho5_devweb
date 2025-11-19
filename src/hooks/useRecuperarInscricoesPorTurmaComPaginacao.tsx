import { useQuery } from "@tanstack/react-query";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";
import type { Inscricao } from "../interfaces/Inscricao";

const recuperarInscricoesPorTurmaComPaginacao = async (queryString:QueryString):Promise<ResultadoPaginado<Inscricao>> => {
  const response = await fetch("http://localhost:8080/inscricoes/paginacao?"+new URLSearchParams({...queryString}));
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar alunos. Status code: " + response.status
    );
  }
  return await response.json();
};
interface QueryString{
    pagina:string,
    tamanho:string,
    turma?:string
}

const useRecuperarInscricoesPorTurmaComPaginacao = (queryString:QueryString) => {
  return useQuery({
    queryKey: ["inscricoes","paginacao",queryString],
    queryFn: () => recuperarInscricoesPorTurmaComPaginacao(queryString),
    staleTime: 10_000, //obsoleto após 10 segundos
  });
};
export default useRecuperarInscricoesPorTurmaComPaginacao;
