import { IQuery } from "./type";

export const keysOfIQuery: string[] = ['__l', '__p'];
export const numberParams: string[] = ["status"];

export function formatQuery(params: IQuery | undefined): any {
    if (!params) return {};

    const query: any = {};
    Object.entries(params).forEach(([key, value]) => {
        if (keysOfIQuery.indexOf(key) > -1 || typeof value !== 'string' || typeof value !== 'number') return;

        if (numberParams.indexOf(key) > -1) {
            query[key] = {
                $eq: typeof value === 'number' ? value : parseInt(value, 10)
            };
        } else {
            query[key] = { $regex: new RegExp("^" + value) };
        }
    });
    return query;
}