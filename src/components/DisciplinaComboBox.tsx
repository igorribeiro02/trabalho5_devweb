import { useInscricaoStore } from "../store/inscricaoStore";
import { useRecuperarDisciplinas } from "../hooks/useRecuperarDisciplinas";

const DisciplinaComboBox = () => {
  // 1. Conecta-se ao Zustand
  // Obtém o 'disciplinaId' atual e a função 'setDisciplinaId' para atualizá-lo
  const { disciplinaId, setDisciplinaId } = useInscricaoStore();

  // 2. Busca os dados (Hook dentro do componente, como o professor pediu)
  const { data: disciplinas, isLoading, isError } = useRecuperarDisciplinas();

  // 3. Função de callback para quando o usuário mudar a seleção
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? Number(e.target.value) : undefined;
    setDisciplinaId(id); // Atualiza o estado global no Zustand
  };

  return (
    <div className="mb-3">
      <label htmlFor="disciplina" className="form-label fw-bold">
        Disciplina:
      </label>
      <select
        id="disciplina"
        className="form-select"
        value={disciplinaId || ""}
        onChange={handleChange}
        disabled={isLoading} // Desabilita enquanto carrega
      >
        {/* Opção padrão */}
        <option value="">
          {isLoading ? "Carregando..." : "Selecione uma disciplina"}
        </option>

        {/* Exibe erro se houver */}
        {isError && (
          <option value="" disabled>
            Erro ao carregar disciplinas
          </option>
        )}

        {/* Mapeia e exibe as disciplinas buscadas */}
        {disciplinas?.map((disciplina) => (
          <option key={disciplina.id} value={disciplina.id}>
            {disciplina.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisciplinaComboBox;