import { EStatus } from "../enums/to-do.enum";
import { IToDoTableCell } from "src/components/to-do/table/ToDoTable";
import { Status } from "../utils/type";

export const toDoTableHeadCellProps: IToDoTableCell[] = [
    { orderId: 'title', label: 'Title' },
    { orderId: 'status', label: 'Status', style: { flex: '0 0 100px' } },
    { orderId: '', label: '', style: { flex: '0 0 100px' } }
];

export const paginationOptions: number[] = [5, 10, 25];

export const statusOptions: Status[] = [
    { label: 'To-Do', value: EStatus.TO_DO },
    { label: 'Doing', value: EStatus.DOING },
    { label: 'Done', value: EStatus.DONE },
    { label: 'Pending', value: EStatus.PENDING }
];

export const flexRowCss: React.CSSProperties = {
    display: 'flex',
    flexFlow: 'row nowrap',
    placeContent: 'center space-between',
};