import { useQuery } from "@tanstack/react-query";

const recuperarInscricoesPorTurma = async (turmaId: string) => {
  if (turmaId) {
    const response = await fetch(
      "http://localhost:8080/inscricoes/turma=" + turmaId
    );
    if (!response.ok) {
      throw new Error(
        "Ocorreu um erro ao recuperar alunos. Status code: " + response.status
      );
    }
    return await response.json();
  } else {
    return {};
  }
};

const useRecuperarInscricoesPorTurma = (turmaId: string) => {
  return useQuery({
    queryKey: ["inscricoes", turmaId],
    queryFn: () => recuperarInscricoesPorTurma(turmaId),
    staleTime: 10_000, //obsoleto após 10 segundos
  });
};
export default useRecuperarInscricoesPorTurma;
