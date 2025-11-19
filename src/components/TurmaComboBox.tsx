import  { useInscricaoStore } from "../store/inscricaoStore";
import { useRecuperarTurmasPorDisciplina } from "../hooks/useRecuperarTurmasPorDisciplina";

const TurmaComboBox = () => {
  // 1. Conecta-se ao Zustand
  // Escuta o 'disciplinaId' e obtém o 'turmaId' e a função 'setTurmaId'
  const { disciplinaId, turmaId, setTurmaId } = useInscricaoStore();

  // 2. Busca os dados
  // O hook só será executado quando 'disciplinaId' tiver um valor
  const { data: turmas, isLoading, isError } =
    useRecuperarTurmasPorDisciplina(disciplinaId);

  // 3. Callback de mudança
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? Number(e.target.value) : undefined;
    setTurmaId(id); // Atualiza o estado global no Zustand
  };

  // 4. Lógica de "desabilitado"
  // O combo deve estar desabilitado se nenhuma disciplina foi selecionada
  const isEnabled = !!disciplinaId;

  return (
    <div className="mb-3">
      <label htmlFor="turma" className="form-label fw-bold">
        Turma:
      </label>
      <select
        id="turma"
        className="form-select"
        value={turmaId || ""}
        onChange={handleChange}
        disabled={!isEnabled || isLoading} // Desabilitado se não houver disciplinaId ou se estiver carregando
      >
        <option value="">
          {!isEnabled
            ? "Selecione uma disciplina primeiro"
            : isLoading
            ? "Carregando turmas..."
            : "Selecione uma turma"}
        </option>

        {isError && (
          <option value="" disabled>
            Erro ao carregar turmas
          </option>
        )}

        {/* Mapeia e exibe as turmas */}
        {turmas?.map((turma) => (
          <option key={turma.id} value={turma.id}>
            {turma.codigo} ({turma.ano} / {turma.periodo})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TurmaComboBox;