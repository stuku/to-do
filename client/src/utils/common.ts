import { EStatus } from '../enums/to-do.enum';
import { IPagination, Status } from './type';
import { OperateResponse } from '../store/actions/type';

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

export function capitalize(str: string): string {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getToastMessage(result: OperateResponse): string {
    return result.join(' ');
}

export function mapBadgeColor(status: Status): 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' {
    switch (status) {
        case EStatus.TO_DO:
            return 'info';
        case EStatus.DOING:
            return 'secondary';
        case EStatus.DONE:
            return 'success';
        case EStatus.PENDING:
            return 'warning';
        default:
            return 'error';
    }
}