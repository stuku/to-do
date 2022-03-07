import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ToDoParams } from '@utils/type';

interface IToDoContentInput extends Omit<ToDoParams, 'status'> {
  onUpdateTitle: (newTitle: string) => void;
  onUpdateDescription: (newDescription: string) => void;
}

export default function ToDoContentInput(
  props: IToDoContentInput
): JSX.Element {
  const handleUpdateTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    props.onUpdateTitle(event.target.value);
  };
  const handleUpdateDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    props.onUpdateDescription(event.target.value);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: 1,
        height: 140
      }}
    >
      <TextField
        defaultValue={props.title || ''}
        label="Title"
        margin="normal"
        required
        size="small"
        variant="standard"
        onChange={handleUpdateTitle}
      />
      <TextField
        defaultValue={props.description || ''}
        label="Description"
        multiline
        rows={2}
        size="small"
        variant="standard"
        onChange={handleUpdateDescription}
      />
    </Box>
  );
}
