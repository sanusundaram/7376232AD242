import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

function FilterBar({ type, setType }) {
  return (
    <FormControl fullWidth sx={{ marginBottom: 3 }}>
      <InputLabel>
        Filter
      </InputLabel>
      <Select
        value={type}
        label="Filter"
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value="">  All   </MenuItem>
        <MenuItem value="Placement">  Placement </MenuItem>
        <MenuItem value="Result"> Result  </MenuItem>
        <MenuItem value="Event">  Event </MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterBar;