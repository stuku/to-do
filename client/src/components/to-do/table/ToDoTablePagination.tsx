import { paginationOptions } from '../../../constants/common';
import TablePagination from '@mui/material/TablePagination';

interface ToDoTablePaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onChangePage: (newPage: number) => void;
  onChangePageSize: (newPageSize: number) => void;
}

export default function ToDoTablePagination(
  props: ToDoTablePaginationProps
): JSX.Element {
  const { page, pageSize, totalCount } = props;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ): void => {
    if (
      typeof props.onChangePage !== 'function' ||
      typeof newPage !== 'number'
    ) {
      return;
    }
    props.onChangePage(newPage);
  };
  const handleChangePageSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      typeof props.onChangePage !== 'function' ||
      typeof event.target.value !== 'number'
    ) {
      return;
    }
    props.onChangePageSize(event.target.value);
  };

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page}
      rowsPerPage={pageSize}
      rowsPerPageOptions={paginationOptions}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangePageSize}
    />
  );
}
