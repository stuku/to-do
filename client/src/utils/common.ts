import { EStatus } from '../enums/to-do.enum';
import { IPagination, Status } from './type';
import { OperatePayload } from '../store/actions/type';

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

export function capitalize(str: string): string {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getToastMessage(result: OperatePayload): string {
    if (!Array.isArray(result)) return '';
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