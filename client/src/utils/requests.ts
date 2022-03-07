import {
    encodeQueryParams,
    NumberParam,
    StringParam
} from 'serialize-query-params';
import { formatPagination } from './common';
import { IPagination, IToDoQuery } from './type';
import { IToDoFilterBy } from '@store/reducers/type';
import { stringify } from 'query-string';

export function encodeToDoQuery(query: IToDoQuery | undefined): string {
    if (!query) return '';
    return stringify(encodeQueryParams(
        { __l: NumberParam, __p: NumberParam, title: StringParam, description: StringParam, status: NumberParam },
        query
    ));
}

export function formatToDoQuery(filterBy: IToDoFilterBy = {}, pagination: IPagination = formatPagination()): IToDoQuery {
    return {
        ...(filterBy || {}),
        __l: pagination?.pageSize,
        __p: pagination?.page
    }
} 