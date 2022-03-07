import { IPagination } from "./type";

export function forceParseInt(numLike: string | number): number {
    try {
        return typeof numLike === 'string' ? parseInt(numLike) : numLike;
    } catch (e) {
        console.error('parse error');
    }
    return -1;
}

export function countPage(totalCount: number, pageSize: number): number {
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