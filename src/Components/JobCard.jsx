import { Box, Stack, Typography } from "@mui/material";

const JobCard = ({ data }) => {
    return (
      <>
        <Box
          className="card-body"
          sx={{
            p: 3,
            borderRadius: 3,
            maxWidth: "300px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <img width={40} height={60} src={data?.logoUrl} alt="Company Logo" />
            <Stack sx={{ lineHeight: 1.5 }}>
              <Box
                sx={{
                  color: "#8b8b8b",
                  cursor: "pointer",
                  letterSpacing: 1,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {data?.companyName}
              </Box>
              <Box
                sx={{
                  textTransform: "capitalize",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                {data?.jobRole}
              </Box>
              <Box
                sx={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {data?.location}
              </Box>
            </Stack>
          </Stack>
          <Typography sx={{ my: 1.5, fontSize: 15, color: "rgb(77, 89, 106)" }}>
            Estimated Salary: ₹
            {data?.minJdSalary
              ? data?.minJdSalary + " - " + data?.maxJdSalary
              : data?.maxJdSalary
              ? data?.maxJdSalary
              : data?.minJdSalary}{" "}
            LPA
          </Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
            About this Company
          </Typography>
          <Box class="fade-text">
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              About us:
            </Typography>
            <p>{data?.jobDetailsFromCompany}</p>
          </Box>
          <span class="read-more">Read more</span>
        </Box>
      </>
    );
  };

  export default JobCard;