import {create} from 'zustand';


//forma do nosso estado
interface InscricaoState{

    disciplinaId?: number;
    turmaId?: number;
    alunoId?: number;
    termoPesquisa: string;

    pagina:number;

    //funções para alterar o estado
    setDisciplinaId: (id?: number) => void;
    setTurmaId: (id?: number) => void;
    setAlunoId: (id?: number) => void;
    setTermoPesquisa: (termo: string) => void;
    setPagina: (pagina: number) => void;
}

//criar o hook do store

export const useInscricaoStore = create<InscricaoState>((set) => ({
    disciplinaId: undefined,
    turmaId: undefined,
    alunoId: undefined,
    termoPesquisa: '',
    pagina: 0,

    setDisciplinaId:(id) =>
        set(() => ({
            disciplinaId: id,
            //ao mudar a disciplina, muda o resto
            turmaId: undefined,
            alunoId: undefined,
            pagina: 0,
            termoPesquisa: '',
        })),

    setTurmaId:(id) =>
        set(() => ({
            turmaId: id,
            //ao mudar a turma, limpa o aluno e reseta a pagina
            alunoId: undefined,
            pagina: 0,
            termoPesquisa: '',
        })),

    setAlunoId:(id) => set({alunoId: id}),

    setTermoPesquisa:(termo) =>
        set(() => ({
            termoPesquisa: termo,
            pagina: 0, //reseta a pagina ao mudar o termo
        })),

    setPagina:(pagina) => set({pagina}),
}));


