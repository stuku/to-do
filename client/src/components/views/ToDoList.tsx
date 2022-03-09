import {
  addToDo,
  changePageNumber,
  changePageSize,
  deleteToDo,
  getToDos,
  setFilterBy,
  setSortBy,
  updateToDo,
} from '../../store/actions/to-do.action';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { IToDoState } from '@store/reducers/type';
import { RootState } from '@store/type';
import { setOverlay } from '../../store/actions/common.action';
import ToDoForm from '../to-do/ToDoForm';
import ToDoTable from '../to-do/table/ToDoTable';

const mapStateToProps = (state: RootState): IToDoState => state.toDo;

const dispatchProps = {
  getAll: getToDos,
  addOne: addToDo,
  updateOne: updateToDo,
  deleteOne: deleteToDo,
  changePageNumber,
  changePageSize,
  setFilterBy,
  setSortBy,
  setOverlay,
};

export type ToDoListProps = ReturnType<typeof mapStateToProps> &
  typeof dispatchProps;

function ToDoList(props: ToDoListProps): JSX.Element {
  return (
    <Container maxWidth="md" style={{ padding: '3rem' }}>
      <ToDoForm onAdd={props.addOne} />
      <ToDoTable {...props} />
    </Container>
  );
}

export default connect(mapStateToProps, dispatchProps)(ToDoList);
