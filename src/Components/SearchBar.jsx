import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const SelectWithSearch = ({ options, onChange, label, sx }) => {
  return (
    <Autocomplete
      options={options}
      onChange={(event, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default function SearchBar() {
  const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <SelectWithSearch
        options={options}
        onChange={handleSelectChange}
        label={"Roles"}
      />
      {selectedOption && <p>Selected Option: {selectedOption.label}</p>}
    </div>
  );
}
