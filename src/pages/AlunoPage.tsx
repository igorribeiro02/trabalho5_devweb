import { useLocation, Link } from "react-router-dom";
import type { AlunoDTO } from "../interfaces/AlunoDTO";

const AlunoPage = () => {
  // 1. Busca os dados da navegação
  const location = useLocation();

  // 2. Extrai o aluno do 'state' que o 'useCadastrarAluno' enviou
  const aluno = location.state as AlunoDTO;

  // 3. Fallback se a página for acessada diretamente
  if (!aluno) {
    return (
      <div className="container my-4 text-center">
        <h2>Erro: Nenhum dado de aluno</h2>
        <p>
          Você precisa cadastrar um aluno para ver esta página.
        </p>
        <Link to="/cadastrar-aluno" className="btn btn-primary">
          Ir para o Cadastro
        </Link>
      </div>
    );
  }

  // 4. Exibe os dados do aluno cadastrado
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="alert alert-success text-center" role="alert">
            <h4>Aluno Cadastrado com Sucesso!</h4>
          </div>

          <div className="card">
            <div className="card-header">
              <strong>ID do Aluno: {aluno.id}</strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Nome:</strong> {aluno.nome}
              </li>
              <li className="list-group-item">
                <strong>E-mail:</strong> {aluno.email}
              </li>
              <li className="list-group-item">
                <strong>CPF:</strong> {aluno.cpf}
              </li>
            </ul>
          </div>

          <Link to="/cadastrar-aluno" className="btn btn-secondary mt-3">
            Cadastrar Outro Aluno
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;