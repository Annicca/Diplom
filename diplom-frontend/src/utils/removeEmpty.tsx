export const removeEmpty = (obj: object) => 
    Object.entries(obj)
        .filter(([, value]) => value != null && value !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});