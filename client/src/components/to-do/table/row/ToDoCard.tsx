import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { flexRowCss } from '../../../../constants/common';
import { EStatusLabel } from '../../../../enums/to-do.enum';
import IconButton from '@mui/material/IconButton';
import { IToDo, IUpdateToDoPayload } from '../../../../utils/type';
import { mapBadgeColor } from '../../../../utils/common';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ToDoContentInput from '../../ToDoContentInput';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

interface ToDoCardProps {
  toDo: IToDo;
  onDelete: (id: string) => void;
  onUpdate: (payload: IUpdateToDoPayload) => void;
}

export default function ToDoCard(props: ToDoCardProps): JSX.Element {
  const { _id, title = '', description = '', status } = props.toDo || {};
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const handleEditTitle = (text: string): void => setNewTitle(text);
  const handleEditDescription = (text: string): void => setNewDescription(text);
  const handleSave = () => {
    props.onUpdate({
      id: _id,
      data: { ...props.toDo, title: newTitle, description: newDescription },
    });
    setIsEditing(false);
    setNewTitle(newTitle);
    setNewDescription(newDescription);
  };
  const handleClickEditIcon = (event: React.MouseEvent<unknown>) => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      handleSave();
    }
  };
  const handleDelete = (event: React.MouseEvent<unknown>) => {
    props.onDelete(_id);
  };

  return (
    <TableRow
      hover
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        '& > *': { borderBottom: 'unset' },
      }}
    >
      <TableCell component="th" scope="row" style={flexRowCss}>
        {!isEditing ? (
          <Box style={{ flex: 1 }}>
            {title}
            <div style={{ paddingTop: 4, color: 'gray', fontSize: 12 }}>
              {description}
            </div>
          </Box>
        ) : (
          <ToDoContentInput
            title={title || ''}
            description={description || ''}
            onUpdateTitle={handleEditTitle}
            onUpdateDescription={handleEditDescription}
          />
        )}
      </TableCell>
      <TableCell align="right" style={{ flex: '0 0 200px' }}>
        <Button color={mapBadgeColor(status)} variant="outlined">
          {EStatusLabel[status]}
        </Button>
      </TableCell>
      <TableCell align="right" sx={{ pr: 1 }} style={{ flex: '0 0 80px' }}>
        <Tooltip title={!isEditing ? 'Edit' : 'Save'}>
          <IconButton color="info" onClick={handleClickEditIcon}>
            {!isEditing ? <EditIcon /> : <SaveIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
