import useRecuperarInscricoesPorTurma from "../hooks/useRecuperarInscricoesPorTurma";
import TabelaDeInscricoesComAddGrupo from "../components/TabelaDeInscricoesComAddGrupo";
import { useEffect, useState, type ChangeEventHandler, type SetStateAction } from "react";
import useRecuperarTurmas from "../hooks/useRecuperarTurmas";
import type { Turma } from "../interfaces/Turma";
import { Formatters } from "../util/Formatters";
import type { Aluno } from "../interfaces/Aluno";

const AlunosPorTurmaPage = () => {


  const [idTurma, setIdTurma] = useState(1);
  const { 
    data: turmas, 
    error: erroRecuperarTurmas 
  } = useRecuperarTurmas();

  const {
    data: inscricoes,
    isPending: recuperandoAlunos,
    error: errorRecuperarAlunos,
  } = useRecuperarInscricoesPorTurma(String(idTurma));

    const[grupo, setGrupo] = useState(()=>{
    const alunosNoGrupoDaTurma = localStorage.getItem("grupo"+idTurma); 
    return alunosNoGrupoDaTurma?JSON.parse(alunosNoGrupoDaTurma):[];
  });

  useEffect(()=>{ 
    localStorage.setItem("grupo"+idTurma, JSON.stringify(grupo));
  },[grupo]);

  const getGrupo = (id:number)=>{
    const alunosNoGrupoDaTurma = localStorage.getItem("grupo"+id);
    return alunosNoGrupoDaTurma?JSON.parse(alunosNoGrupoDaTurma):[];
  }

  const adicionarAoGrupo = (aluno:Aluno)=>{
    setGrupo((grupoAnterior:number[])=>{ // grupo vai ser um array de ids de alunos
      grupoAnterior.push(aluno.id);
      // precisa criar um novo array pq o react só detecta mudança assim
      let novoGrupo:number[] = [];
      grupoAnterior.forEach((elemento:number)=>{
        novoGrupo.push(elemento);
      });
      return novoGrupo;
    });
  }

  const removerDoGrupo = (aluno:Aluno)=>{
    setGrupo((grupoAnterior:number[])=>{ // grupo vai ser um array de ids de alunos
      let novoGrupo:number[] = [];
      grupoAnterior.forEach((elemento:number)=>{
        if(elemento != aluno.id){
          novoGrupo.push(elemento);
        }
      })
      return novoGrupo;
    });
  }
  
  if (errorRecuperarAlunos) throw errorRecuperarAlunos;
  if (erroRecuperarTurmas) throw erroRecuperarTurmas;
  if (recuperandoAlunos) return <p>Recuperando alunos...</p>;
  const tratarSelecao = (evento: { target: { value: SetStateAction<number>; }; })=>{
      setIdTurma(evento.target.value);
      setGrupo(getGrupo(Number(evento.target.value)));
  }
 
  return (
    <>
      <select onChange={tratarSelecao}className="form-select mb-3" aria-label="Seletor de turmas">
        {turmas.map((turma: Turma) => (
          <option value={turma.id} key={turma.id}>
            {Formatters.getFullTurmaNome(turma)}
          </option>
        ))}
      </select>
      <h5>Lista de Alunos na turma</h5>
      <hr className="mt-1" />
      <TabelaDeInscricoesComAddGrupo inscricoes={inscricoes} grupo={grupo} adicionarAoGrupo={adicionarAoGrupo} removerDoGrupo={removerDoGrupo} />
    </>
  );
  // 
};
export default AlunosPorTurmaPage;
