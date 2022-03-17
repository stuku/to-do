import { ESort } from '../enums/common.enum';
import { EStatus } from '../enums/to-do.enum';
import { ISortBy } from '@store/reducers/type';
import { IToDoTableCell } from '../components/to-do/table/ToDoTable';
import { Status } from '../utils/type';

export const toDoTableHeadCellProps: IToDoTableCell[] = [
    { orderId: 'title', label: 'Title', disableSort: false },
    { orderId: 'status', label: 'Status', align: 'right', style: { flex: '0 0 200px' }, disableSort: false },
    { orderId: '', label: '', style: { flex: '0 0 100px' }, disableSort: true }
];

export const paginationOptions: number[] = [5, 10, 25];

export const statusValues: Status[] = [EStatus.TO_DO, EStatus.DOING, EStatus.DONE, EStatus.PENDING];

export const flexRowCss: React.CSSProperties = {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: ' space-between',
    alignItems: 'center',
};

export const filterByValues: string[] = ['', 'title', 'description'];

export const defaultSortBy: ISortBy = {
    property: '_id',
    value: ESort.ASC,
};