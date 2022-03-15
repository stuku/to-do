import {
    encodeQueryParams,
    NumberParam,
    StringParam
} from 'serialize-query-params';
import { defaultSortBy } from '../constants/common';
import { formatPagination } from './common';
import { IPagination, IToDoQuery } from './type';
import { ISortBy, IToDoFilterBy } from '@store/reducers/type';
import { stringify } from 'query-string';

export function encodeToDoQuery(query: IToDoQuery | undefined): string {
    if (!query) return '';
    return stringify(encodeQueryParams(
        { __l: NumberParam, __p: NumberParam, __sv: NumberParam, __sp: StringParam, title: StringParam, description: StringParam, status: NumberParam },
        query
    ));
}

export function formatToDoQuery(filterBy: IToDoFilterBy = {}, sortBy: ISortBy = defaultSortBy, pagination: IPagination = formatPagination()): IToDoQuery {
    return {
        ...(filterBy || {}),
        __sp: sortBy?.property,
        __sv: sortBy?.value,
        __l: pagination?.pageSize,
        __p: pagination?.page
    };
} 