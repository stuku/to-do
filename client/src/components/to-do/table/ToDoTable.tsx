import Box from '@mui/material/Box';
import { IToDo } from '../../../utils/type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import ToDoCard from './row/ToDoCard';
import { ToDoListProps } from 'src/components/views/ToDoList';
import ToDoTableHead from './ToDoTableHead';
import ToDoTablePagination from './ToDoTablePagination';
import { TOrder } from './ToDoTableHead';
import { useEffect, useState } from 'react';

export interface IToDoTableCell {
  label: string;
  orderId: string;
  style?: React.CSSProperties;
}

interface ToDoTableProps extends ToDoListProps {}

export default function ToDoTable(props: ToDoTableProps): JSX.Element {
  const { list, pagination, getAll } = props;
  const [order, setOrder] = useState<TOrder>('asc');
  const [orderBy, setOrderBy] = useState<string>('title');
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (newPage: number) => {
    props.changePageNumber(newPage);
  };
  const handleChangePageSize = (newPageSize: number) => {
    props.changePageSize(newPageSize);
  };

  useEffect(() => {
    getAll();
  }, [pagination.pageSize, pagination.page]);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <ToDoTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {list.map((toDo: IToDo, index: number) => (
              <ToDoCard
                key={index}
                toDo={toDo}
                onDelete={props.deleteOne}
                onUpdate={props.updateOne}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToDoTablePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalCount={pagination.totalCount}
        onChangePage={handleChangePage}
        onChangePageSize={handleChangePageSize}
      />
    </Box>
  );
}
