import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState();
  useEffect(() => {
    const getJobs = async () => {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        limit: 10,
        offset: 0,
      });

      let response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data = await response.json();
      setJobs(data?.jdList);
    };

    getJobs();
  }, []);
  console.log(jobs?.map((item) => item));
  return (
    <div className="wrapper">
      <div className="jobcards">
        {jobs?.map((job) => (
          <JobCard key={job.jdUid} data={job} />
        ))}
      </div>
    </div>
  );
}

const JobCard = ({ data }) => {
  return (
    <div className="card">
      <div className="card-head">
        <img src={data?.logoUrl} alt="Company Logo" />
        <div>
          <div>{data?.companyName}</div>
          <div>{data?.jobRole}</div>
          <div>{data?.location}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
