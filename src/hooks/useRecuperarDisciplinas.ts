import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient';
import type { Disciplina } from '../interfaces/Disciplina';

const fetchDisciplinas = async () =>{
    const{data} = await apiClient.get<Disciplina[]>('/disciplinas');
    return data;
}

export const useRecuperarDisciplinas = () => {
    return useQuery({
        queryKey: ['disciplinas'],
        queryFn: fetchDisciplinas,
    });
}