import { forceParseInt } from "./common";
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
                $eq: forceParseInt(value)
            };
        } else {
            query[key] = { $regex: new RegExp("^" + value) };
        }
    });
    return query;
}

export function getSkipNumber(pageSize: number, page: number): number {
    return forceParseInt(pageSize) * (forceParseInt(page) + 1) - forceParseInt(pageSize);
}