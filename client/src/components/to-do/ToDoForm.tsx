import AddIcon from '@mui/icons-material/AddCircleOutlined';
import Box from '@mui/material/Box';
import { EStatus, EStatusLabel } from '../../enums/to-do.enum';
import { flexRowCss, statusValues } from '../../constants/common';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Status, ToDoParams } from '@utils/type';
import ToDoContentInput from './ToDoContentInput';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { validateToDoParams } from '../../utils/validation';

interface ToDoFormProps {
  onAdd: (toDo: ToDoParams) => void;
}

export default function ToDoForm(props: ToDoFormProps): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<Status>(EStatus.TO_DO);

  const handleEditTitle = (text: string): void => setTitle(text);
  const handleEditDescription = (text: string): void => setDescription(text);
  const handleUpdateStatus = (event: SelectChangeEvent): void =>
    setStatus(event.target.value);
  const handleAdd = (event: React.MouseEvent<unknown>): void => {
    if (!validateToDoParams({ title, description, status })) return;
    props.onAdd({ title, description, status });
  };

  return (
    <Box sx={{ p: 2, pt: 0 }} style={flexRowCss}>
      <ToDoContentInput
        title={title}
        description={description}
        onUpdateTitle={handleEditTitle}
        onUpdateDescription={handleEditDescription}
      />
      <FormControl variant="standard" sx={{ m: 1, ml: 2, minWidth: 120 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          label="Status"
          labelId="status-label"
          value={status}
          onChange={handleUpdateStatus}
        >
          {statusValues.map((value: Status) => (
            <MenuItem key={value} value={value}>
              {EStatusLabel[value]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box style={flexRowCss}>
        <Tooltip title="Add">
          <IconButton color="success" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
