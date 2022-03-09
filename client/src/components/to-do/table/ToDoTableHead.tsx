import * as React from 'react';
import Box from '@mui/material/Box';
import { IToDoTableCell } from './ToDoTable';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { toDoTableHeadCellProps } from '../../../constants/common';
import { visuallyHidden } from '@mui/utils';

export type TOrder = 'asc' | 'desc';

interface ToDoTableProps {
  order: TOrder;
  orderBy: string;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
}

export default function ToDoTableHead(props: ToDoTableProps): JSX.Element {
  const { order, orderBy } = props;
  
  const handleSort =
    (property: string) =>
    (event: React.MouseEvent<unknown>): void => {
      typeof props.onRequestSort == 'function' &&
        props.onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {toDoTableHeadCellProps.map((headCell: IToDoTableCell) => (
          <TableCell
            key={headCell.orderId}
            align={headCell.align}
            sortDirection={orderBy === headCell.orderId ? order : false}
            style={headCell.style}
          >
            <TableSortLabel
              active={orderBy === headCell.orderId}
              direction={orderBy === headCell.orderId ? order : 'asc'}
              onClick={handleSort(headCell.orderId)}
            >
              {headCell.label}
              {orderBy === headCell.orderId ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
