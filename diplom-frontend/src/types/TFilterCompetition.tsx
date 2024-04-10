export enum ETypeSort {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface TFiterCompetition {
    city?: string,
    dateStart?: string,
    dateFinish?: string,
    isStatusCompetition?: boolean,
    typeSort?: ETypeSort
}