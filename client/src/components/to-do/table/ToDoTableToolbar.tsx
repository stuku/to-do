import { alpha } from '@mui/material/styles';
import { BehaviorSubject } from 'rxjs';
import { capitalize } from '../../../utils/common';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import DeleteIcon from '@mui/icons-material/Delete';
import { filterByValues } from 'src/constants/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { IToDoFilterBy } from '@store/reducers/type';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';

interface ToDoTableToolbarProps {
  isDisabled?: boolean;
  filterBy: IToDoFilterBy;
  numSelected: number;
  onFilterBy: (filterBy: IToDoFilterBy) => void;
}

export default function ToDoTableToolbar(
  props: ToDoTableToolbarProps
): JSX.Element {
  const [subject, setSubject] = useState<BehaviorSubject<string> | null>(null);
  const { isDisabled, numSelected } = props;
  const [property, keyword] = Object.entries(props.filterBy || {})[0] || [];
  const [newProperty, setNewProperty] = useState<string>(property || '');
  const [newKeyword, setNewKeyword] = useState<string>(keyword || '');
  const filterByRef = useRef<string>();
  filterByRef.current = newProperty || '';

  useEffect(() => {
    if (subject === null) {
      const sub: BehaviorSubject<string> = new BehaviorSubject('');
      setSubject(sub);
    } else {
      const keyword$ = subject
        .pipe(
          map((str: string) => str.trim()),
          distinctUntilChanged(),
          filter((str: string) => str.length >= 2),
          debounceTime(800)
        )
        .subscribe((value: string) => {
          if (!!filterByRef.current) {
            props.onFilterBy({ [filterByRef.current]: value });
          }
        });

      return () => keyword$.unsubscribe();
    }
  }, [subject]);

  const handleUpdateFilterBy = (event: SelectChangeEvent): void => {
    setNewProperty(event.target.value);

    if (!newKeyword) return;
    props.onFilterBy({ [event.target.value]: newKeyword });
  };
  const handleUpdateKeyword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewKeyword(event.target.value);

    if (!subject || !newProperty) return;
    return subject.next(event.target.value);
  };
  const handleClickIcon = (event: React.MouseEvent<unknown>) => {
    if (numSelected > 0 || !newKeyword) return;

    props.onFilterBy({});
    setNewProperty('');
    setNewKeyword('');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        color={numSelected > 0 ? 'inherit' : ''}
        variant={numSelected > 0 ? 'subtitle1' : 'h6'}
        component="div"
      >
        {numSelected > 0 ? `${numSelected} selected` : 'To-Do List'}
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, ml: 2, minWidth: 120 }}>
        <InputLabel id="filter-by-label">Filter By</InputLabel>
        <Select
          disabled={isDisabled}
          label="Filter By"
          labelId="filter-by-label"
          value={newProperty}
          onChange={handleUpdateFilterBy}
        >
          {filterByValues.map((value: string) => (
            <MenuItem key={value} value={value}>
              {capitalize(value)}
            </MenuItem>
          ))}
        </Select>
        <TextField
          disabled={isDisabled}
          label="Keyword"
          margin="normal"
          size="small"
          variant="standard"
          value={newKeyword}
          onChange={handleUpdateKeyword}
        />
      </FormControl>
      <Tooltip title={numSelected > 0 ? 'Delete' : 'Rest Filter'}>
        <IconButton onClick={handleClickIcon}>
          {numSelected > 0 ? <DeleteIcon /> : <FilterListIcon />}
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
