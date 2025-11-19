import { useInscricaoStore } from "../store/inscricaoStore";
import { useRecuperarInscricoesPaginadas } from "../hooks/useRecuperarInscricoesPaginadas";
import { useRecuperarTurmaPorId } from "../hooks/useRecuperarTurmaPorId";
import {type InscricaoDTO } from "../interfaces/InscricaoDTO"; // <-- PASSO 1: Importe o tipo

const TabelaDeAlunosPorTurma = () => {
  // 1. Conecta-se ao Zustand para ler o estado
  const { turmaId, pagina, termoPesquisa } = useInscricaoStore();

  // 2. Busca os dados da Tabela (Inscrições Paginadas)
  const {
    data: pageData,
    isLoading: isLoadingInscricoes,
    isError: isErrorInscricoes,
  } = useRecuperarInscricoesPaginadas(turmaId, pagina);

  // 3. Busca os dados do Cabeçalho (Detalhes da Turma)
  const {
    data: turma,
    isLoading: isLoadingTurma,
    isError: isErrorTurma,
  } = useRecuperarTurmaPorId(turmaId);

  // 4. Requisito: Filtragem em memória
  // CORREÇÃO AQUI: Adicionamos o tipo (inscricao: InscricaoDTO)
  const inscricoesFiltradas =
    pageData?.content.filter((inscricao: InscricaoDTO) => // <-- PASSO 2: Adicione o tipo aqui
      inscricao.aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    ) ?? [];

  // 5. Renderização condicional
  if (!turmaId) {
    return (
      <div className="alert alert-info" role="alert">
        Selecione uma disciplina e uma turma para ver os alunos inscritos.
      </div>
    );
  }

  if (isLoadingInscricoes || isLoadingTurma) {
    return <div>Carregando dados da turma...</div>;
  }

  if (isErrorInscricoes || isErrorTurma || !turma) {
    return (
      <div className="alert alert-danger" role="alert">
        Erro ao carregar dados da turma.
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      {/* Cabeçalho com os detalhes da Turma (igual à imagem) */}
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="me-3">
              <strong>Ano:</strong> {turma.ano}
            </span>
            <span className="me-3">
              <strong>Período:</strong> {turma.periodo}
            </span>
            <span className="me-3">
              <strong>Disciplina:</strong> {turma.disciplina.nome}
            </span>
            <span>
              <strong>Prof.</strong> {turma.professor.nome}
            </span>
          </div>
          <span className="badge bg-primary rounded-pill fs-6">
            Total de alunos na turma: {pageData?.totalElements ?? 0}
          </span>
        </div>
      </div>

      {/* Tabela de Alunos */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-sm mb-0">
          <thead className="table-dark">
            <tr>
              <th className="text-center align-middle" style={{ width: "10%" }}>
                ID (Inscrição)
              </th>
              <th className="align-middle">Nome</th>
              <th className="align-middle">Email</th>
              <th className="align-middle" style={{ width: "20%" }}>
                CPF
              </th>
            </tr>
          </thead>
          <tbody>
            {inscricoesFiltradas.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  {termoPesquisa
                    ? "Nenhum aluno encontrado com esse nome."
                    : "Nenhum aluno inscrito nesta turma."}
                </td>
              </tr>
            )}
            {inscricoesFiltradas.map((inscricao) => (
              <tr key={inscricao.id}>
                <td className="text-center align-middle">{inscricao.id}</td>
                <td className="align-middle">{inscricao.aluno.nome}</td>
                <td className="align-middle">{inscricao.aluno.email}</td>
                <td className="align-middle">{inscricao.aluno.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDeAlunosPorTurma;