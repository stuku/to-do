import { forceParseInt } from "./common";
import { IToDoQuery } from "./type";

const keysOfPagination: string[] = ["__l", "__p"];
const keysOfSort: string[] = ["__sv", "__sp"];
const numberParams: string[] = ["status"];

export function formatQuery(params: IToDoQuery | undefined): any {
    if (!params) return {};

    const query: any = {};
    Object.entries(params).forEach(([key, value]) => {
        if (keysOfPagination.indexOf(key) > -1 || keysOfSort.indexOf(key) > -1 || (typeof value !== "string" && typeof value !== "number")) return;

        if (numberParams.indexOf(key) > -1) {
            query[key] = { $eq: forceParseInt(value) };
        } else {
            query[key] = { $regex: new RegExp("^" + value, "i") };
        }
    });
    return query;
}

export function getSkipNumber(pageSize: number, page: number): number {
    return forceParseInt(pageSize) * (forceParseInt(page) + 1) - forceParseInt(pageSize);
}