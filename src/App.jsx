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
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setlimit] = useState(10);
  const [filter, setFilter] = useState({
    Roles: [],
    "Number of Employees": [],
    Experience: null,
    Remote: [],
    "Minimum Base Pay Salary": null,
    compName: null,
  });
  const getJobs = async () => {
    setIsLoading(true);
    setError(null);
    let bodyContent = JSON.stringify({
      limit: limit,
      offset: 0,
    });
    try {
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
      // setJobs(data?.jdList);
      setJobs(prevItems => [...prevItems, ...data?.jdList]);
      setlimit(prevPage => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobs();
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    getJobs();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

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
  console.log(filter);
  const JobList =
    jobs
      ?.filter((job) =>
        filter?.Roles?.length !== 0 ? filter?.Roles?.includes(job.jobRole) : job
      )
      .filter((job) =>
        filter?.Remote?.length !== 0
          ? (filter?.Remote?.includes("office") &&
              job.location !== "remote" &&
              job.location !== "hybrid") ||
            filter?.Remote?.includes(job.location)
          : job
      )
      .filter((job) =>
        filter.Experience ? filter.Experience >= job.minExp : job
      )
      .filter((job) =>
        filter["Minimum Base Pay Salary"]
          ? filter?.["Minimum Base Pay Salary"] <= job.minJdSalary
          : job
      ).filter((job) =>
        filter.compName
          ? job.companyName.toLowerCase().includes(filter.compName)
          : job
      );
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
          sx={{ placeSelf: "end", mt: 3, mx: 1 }}
          id="outlined-size-small"
          size="small"
        />
      </div>
      <Grid container spacing={2}>
        {JobList?.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={job.jdUid}>
            <JobCard data={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
