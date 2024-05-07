import { Container, Grid, Box, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import JobCard from "./Components/JobCard";
import SearchBar from "./Components/SearchBar";
import {
  Experience,
  MiniBasePay,
  Remote,
  Roles,
  numberOfEmployees,
} from "./Components/Options";
import debounce from "./Components/debounce";

function App() {
  const [jobs, setJobs] = useState();
  const [filter, setFilter] = useState({
    "Roles": [],
    "Number of Employees": [],
    "Experience": [],
    "Remote": [],
    "Minimum Base Pay Salary": [],
    compName: [],
  });
  useEffect(() => {
    const getJobs = async () => {
      let bodyContent = JSON.stringify({
        limit: 10,
        offset: 0,
      });

      let response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          body: bodyContent,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();
      setJobs(data?.jdList);
    };

    getJobs();
  }, []);

  const inputfields = [
    { name: "Roles", options: Roles, multiple: true },
    {
      name: "Number of Employees",
      options: numberOfEmployees,
      multiple: true,
    },
    {
      name: "Experience",
      options: Experience,
      multiple: false,
    },
    { name: "Remote", options: Remote, multiple: true },
    {
      name: "Minimum Base Pay Salary",
      options: MiniBasePay,
      multiple: false,
    },
  ];
  const handleCompNameChange = debounce((event) => {
    const newFilter = { ...filter, compName: event.target.value };
    setFilter(newFilter);
  });
  console.log(filter)
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div className="filter-conatiner">
        {inputfields.map((field) => (
          <Box key={field.name} sx={{ height: "55px", mx: 1 }}>
            <SearchBar
              multiple={field.multiple}
              label={field.name}
              options={field.options}
              setFilter={setFilter}
              filter={filter}
            />
          </Box>
        ))}
        <TextField
          placeholder="Search Company Name"
          onChange={handleCompNameChange}
          sx={{ placeSelf: "end", mt: 3, mx:1 }}
          id="outlined-size-small"
          size="small"
        />
      </div>
      <Grid container spacing={2}>
        {jobs?.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={job.jdUid}>
            <JobCard data={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
