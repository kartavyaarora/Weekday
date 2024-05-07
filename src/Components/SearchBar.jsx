import { Autocomplete, TextField } from "@mui/material";

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
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onChange={(event, value) => onChange(value)}
    />
  );
};

export default function SearchBar({
  label,
  options,
  multiple,
  setFilter,
  filter,
}) {
  const handleSelectChange = (option) => {
    const newFilter = multiple
      ? { ...filter, [label]: option?.map((item) => item.value.toLowerCase()) }
      : { ...filter, [label]: option?.value.toLowerCase() };
    setFilter(newFilter);
  };

  return (
    <SelectWithSearch
      options={options}
      onChange={handleSelectChange}
      label={label}
      multiple={multiple}
    />
  );
}
