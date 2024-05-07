import { Box, Button, Stack, Typography } from "@mui/material";

const JobCard = ({ data }) => {
  return (
    <>
      <Box
        className="card-body"
        sx={{
          p: 3,
          height:"460px",
          borderRadius: 3,
          display:"flex",
          flexDirection:"column",
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
          {data?.minJdSalary
            ? "Estimated Salary: ₹"+data?.minJdSalary + " - " + data?.maxJdSalary
            : data?.maxJdSalary
            ? "Estimated Maximum Salary: ₹"+data?.maxJdSalary
            : "Estimated Minimum Salary: ₹"+data?.minJdSalary}{" "}
          LPA
        </Typography>
        <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
          About this Company
        </Typography>
        <Box className="fade-text">
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            About us:
          </Typography>
          <p>{data?.jobDetailsFromCompany}</p>
        </Box>
        <span className="read-more">Read more</span>
        {(data?.minExp || data?.maxExp) && (
            <>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                  mt: "10px",
                  mb: "3px",
                  color: "#8b8b8b",
                }}
              >
                {data?.minExp ? " Minimum Experience" : "Maximum Experience"}
              </Typography>
              {data?.minExp ? (
                <Typography sx={{ fontSize: "14px", lineHeight: 1.5 }}>
                  {data?.minExp} years
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "14px", lineHeight: 1.5 }}>
                  {data?.maxExp} years
                </Typography>
              )}
            </>
          )}
        <Button
          fullWidth
          sx={{
            py: 1,
            alignSelf:"end",
            mt:"auto",
            color: "black",
            bgcolor: "rgb(85, 239, 196)",
            ":hover": { bgcolor: "rgb(85, 239, 196)" },
          }}
        >
          ⚡ Easy Apply
        </Button>
      </Box>
    </>
  );
};

export default JobCard;
