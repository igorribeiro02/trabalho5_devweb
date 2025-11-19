import AlunoComboBox from "./AlunoComboBox";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import { useInscricaoStore } from "../store/inscricaoStore";
import { useInscreverAluno } from "../hooks/useInscreverAluno";

const InscricaoForm = () => {
  // 1. Conecta-se ao Zustand para ler o estado
  // (Como o professor exigiu, o estado NÃO está neste componente)
  const { turmaId, alunoId, setAlunoId } = useInscricaoStore();

  // 2. Obtém o hook de Mutação (para o POST)
  const { mutate: inscreverAluno, isPending: isInscrevendo } =
    useInscreverAluno();

  // 3. Define a ação do botão "Inscrever Aluno"
  const handleInscreverClick = () => {
    // Só executa se o usuário selecionou uma turma E um aluno
    if (turmaId && alunoId) {
      inscreverAluno(
        { turmaId, alunoId },
        {
          // Requisito 4: Após o sucesso da inscrição...
          onSuccess: () => {
            // Limpa o 'alunoId' no Zustand, o que vai
            // resetar o AlunoComboBox para "Selecione um aluno...".
            setAlunoId(undefined);
          },
          onError: (error) => {
            // Opcional: tratar erros
            console.error("Falha ao inscrever aluno:", error);
            alert("Erro: Não foi possível inscrever o aluno.");
          },
        }
      );
    }
  };

  // O botão fica desabilitado se não houver turma/aluno ou se estiver carregando
  const isBotaoDisabled = !turmaId || !alunoId || isInscrevendo;

  return (
    // Card para ficar similar ao layout da imagem
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Inscrição de Aluno em Turma</h4>
      </div>
      <div className="card-body">
        {/* Requisito: O form usa os 3 componentes ComboBox */}
        <div className="row">
          <div className="col-md-6">
            <DisciplinaComboBox />
          </div>
          <div className="col-md-6">
            <TurmaComboBox />
          </div>
        </div>

        <AlunoComboBox />

        {/* O botão "Inscrever Aluno" */}
        <button
          className="btn btn-success w-100 mt-2" // Botão verde para "Inscrever"
          onClick={handleInscreverClick}
          disabled={isBotaoDisabled}
        >
          {isInscrevendo ? "Inscrevendo..." : "Inscrever Aluno"}
        </button>
      </div>
    </div>
  );
};

export default InscricaoForm;