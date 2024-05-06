import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const SelectWithSearch = ({ options, onChange, label, multiple }) => {
  return (
    <Autocomplete
      multiple={multiple}
      id="size-small-outlined-multi"
      size="small"
      sx={{ my: 3, paddingY: 0 }}
      options={options}
      groupBy={(option) => option.heading}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
        />
      )}
      onChange={(event, value) => onChange(value)}
    />
  );
};

export default function SearchBar({ label, options, multiple, width }) {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption)
  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  return (
      <SelectWithSearch
        options={options}
        onChange={handleSelectChange}
        label={label}
        multiple={multiple}
        width={width}
      />
  );
}
