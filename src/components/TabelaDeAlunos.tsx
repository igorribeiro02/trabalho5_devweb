
import type { Aluno } from "../interfaces/Aluno";

interface Props {
  alunos: Aluno[];
}

const TabelaDeAlunos = ({alunos}: Props) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td width="8%" className="text-center align-middle">
                {aluno.id}
              </td>
              <td width="13%" className="text-center align-middle">
                {aluno.nome}
              </td>
              <td width="13%" className="text-center align-middle">
                {aluno.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeAlunos;
