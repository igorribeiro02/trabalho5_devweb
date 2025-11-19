import type { AlunoDTO } from "./AlunoDTO";

export interface InscricaoDTO {
    id: number;
    aluno: AlunoDTO;
    dataInscricao: string; // o back-end converte LocalDate para string JSON
}

