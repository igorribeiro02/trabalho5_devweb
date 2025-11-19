import { useParams } from "react-router-dom";
import type { Turma } from "../interfaces/Turma";


const CardsPorTurma = (turma:Turma) => {
  const { turmaId } = useParams();
  return (
    <>
      <h5>
        {turma.disciplina.nome + " "+turma.ano+"."+turma.periodo}
      </h5>
    </>
  );
};
export default CardsPorTurma;
