import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';
import { ICommonState } from '@store/reducers/type';
import { RootState } from '@store/type';
import ToDoList from './components/views/ToDoList';

const mapStateToProps = (state: RootState): ICommonState => state.common;

type AppProps = ReturnType<typeof mapStateToProps>;

function App(props: AppProps): JSX.Element {
  return (
    <>
      <ToDoList />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!props.overlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default connect(mapStateToProps)(App);
