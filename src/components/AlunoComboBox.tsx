import { useInscricaoStore } from "../store/inscricaoStore";
import { useRecuperarAlunosNaoInscritos } from "../hooks/useRecuperarAlunosNaoInscritos";

const AlunoComboBox = () => {
  // 1. Conecta-se ao Zustand
  const { turmaId, alunoId, setAlunoId } = useInscricaoStore();

  // 2. Busca os dados
  // O hook só será executado quando 'turmaId' tiver um valor
  const { data: alunos, isLoading, isError } =
    useRecuperarAlunosNaoInscritos(turmaId);

  // 3. Callback de mudança
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? Number(e.target.value) : undefined;
    setAlunoId(id); // Atualiza o estado global
  };

  // 4. Lógica de "desabilitado"
  const isEnabled = !!turmaId;

  return (
    <div className="mb-3">
      <label htmlFor="aluno" className="form-label fw-bold">
        Nome:
      </label>
      <select
        id="aluno"
        className="form-select"
        value={alunoId || ""}
        onChange={handleChange}
        disabled={!isEnabled || isLoading}
      >
        <option value="">
          {!isEnabled
            ? "Selecione uma turma primeiro"
            : isLoading
            ? "Carregando alunos..."
            : "Selecione um aluno para inscrever"}
        </option>

        {isError && (
          <option value="" disabled>
            Erro ao carregar alunos
          </option>
        )}

        {/* Mapeia e exibe os alunos */}
        {alunos?.map((aluno) => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.nome} ({aluno.email})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlunoComboBox;