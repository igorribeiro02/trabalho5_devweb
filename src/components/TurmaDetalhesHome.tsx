import { useParams } from "react-router-dom";
// 1. CORREÇÃO: Importar o hook que existe (da lista que acabei de passar)
import { useRecuperarTurmaPorId } from "../hooks/useRecuperarTurmaPorId"; 

// (Imports de 'InscricoesComPaginacaoPage' etc. podem estar aqui)

const TurmaDetalhesHome = () => {
  // Pega o 'id' da URL (ex: /turmas/1)
  const { id } = useParams<{ id: string }>(); // 'id' vem da URL como string

  // 2. CORREÇÃO: Chamar o hook correto
  // O 'id' da URL pode ser undefined, e o hook espera um número.
  // Convertemos para número. O hook já lida com 'undefined'.
  const { data: turma, isLoading, isError } = useRecuperarTurmaPorId(
    id ? Number(id) : undefined
  );

  if (isLoading) {
    return <p>Carregando detalhes da turma...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar a turma.</p>;
  }

  // Se o 'id' for inválido ou a turma não for encontrada
  if (!turma) {
    return <p>Turma não encontrada ou ID inválido.</p>;
  }

  // A partir daqui, o código funciona
  return (
    <div>
      <h3>
        Detalhes da Turma: {turma.disciplina.nome} ({turma.codigo})
      </h3>
      <p>Professor: {turma.professor.nome}</p>
      <hr />

      {/* Aqui você provavelmente renderizava a tabela de alunos, 
        passando o 'turma.id' para ela.
      */}
      {/* <InscricoesComPaginacaoPage turmaId={turma.id} /> */}
    </div>
  );
};

export default TurmaDetalhesHome;