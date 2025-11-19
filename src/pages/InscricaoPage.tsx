import InscricaoForm from "../components/InscricaoForm";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeAlunosPorTurma from "../components/TabelaDeAlunosPorTurma";

// Nota: Este componente NÃO usa 'useState'.
// Toda a lógica de estado é gerida pelo Zustand (useInscricaoStore)
// e pelos próprios componentes filhos.
const InscricaoPage = () => {
  return (
    <div className="container my-4">
      {/* Parte 1: O Formulário de Inscrição 
        (Contém Disciplina, Turma, Aluno e o botão Inscrever)
      */}
      <InscricaoForm />

      {/* Parte 2: O Campo de Pesquisa 
      */}
      <Pesquisa />

      {/* Parte 3: A Tabela de Alunos Inscritos
        (Contém o cabeçalho com detalhes da turma e a tabela)
      */}
      <TabelaDeAlunosPorTurma />

      {/* Parte 4: Os controles de Paginação 
      */}
      <Paginacao />
    </div>
  );
};

export default InscricaoPage;