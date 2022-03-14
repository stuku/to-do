import { IPagination } from "./type";

export function forceParseInt(numeric: string | number): number {
    try {
        return typeof numeric === 'string' ? parseInt(numeric) : numeric;
    } catch (e) {
    }
    return NaN;
}

export function countPage(totalCount: number, pageSize: number): number {
    if (forceParseInt(pageSize) === 0) return 0;
    return Math.ceil(forceParseInt(totalCount) / forceParseInt(pageSize));
}

export function formatPagination(totalCount: number = 0, pageSize: number = 10, page: number = 0): IPagination {
    return {
        totalCount: forceParseInt(totalCount),
        pageCount: countPage(totalCount, pageSize),
        pageSize: forceParseInt(pageSize),
        page: forceParseInt(page)
    };
}