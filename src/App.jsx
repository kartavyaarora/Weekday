import { Container, Grid, Autocomplete, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import JobCard from "./Components/JobCard";
import SearchBar from "./Components/SearchBar";

function App() {
  const [jobs, setJobs] = useState();
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
  console.log(jobs);
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchBar/>
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
