// tipo generico para lidar com a paginação do Springboot

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}