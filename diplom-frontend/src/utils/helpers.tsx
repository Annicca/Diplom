import { ERole } from "src/types/ERole";

export const removeEmpty = (obj: object) => 
    Object.entries(obj)
        .filter(([, value]) => value != null && value !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export const transformDate = (date: string): string =>{
    const d = date.split("-").reverse();
    d[d.length - 1] = d[d.length - 1].substring(2,4);
    return d.join(".")
}

export const formatDateAny = (date: string, split: string, join: string): string => {
    const d = date.split(split);
    return d.join(join)
}

export const chooseStatusStatement = (status: string): string | undefined => {
    switch (status) {
        case 'ACCEPTED': return 'Принято'
        case 'REJECTED': return 'Отклонено'
    }
}

export const chooseTypeStatement = (type: string): string | undefined => {
    switch (type) {
        case 'GROUP': return 'Коллектив'
        case 'COMPETITION': return 'Конкурс'
    }
}

export const chooseRoleUser = (role: ERole): string => {
    switch (role) {
        case ERole.ORGANIZER: return 'Организатор конкурсов';
        case ERole.DIRECTOR: return 'Руководитель коллектива';
        case ERole.ADMIN: return 'Администратор';
        case ERole.CLIENT: return 'Клиент';
    }
}