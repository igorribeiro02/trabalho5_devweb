import { useInscricaoStore } from "../store/inscricaoStore";

const Pesquisa = () => {
  // 1. Conecta-se ao Zustand
  // Obtém o 'termoPesquisa' atual e a função 'setTermoPesquisa'
  // Também obtém o 'turmaId' para saber se deve estar habilitado
  const { termoPesquisa, setTermoPesquisa, turmaId } = useInscricaoStore();

  // 2. Callback de mudança
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado global no Zustand
    setTermoPesquisa(e.target.value); 
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Pesquisa</h4>
      </div>
      <div className="card-body">
        <input
          type="text"
          className="form-control"
          placeholder="Informe o nome de um aluno para filtrar..."
          value={termoPesquisa}
          onChange={handleChange}
          // Desabilita o campo de pesquisa se nenhuma turma estiver selecionada
          disabled={!turmaId}
        />
      </div>
    </div>
  );
};

export default Pesquisa;