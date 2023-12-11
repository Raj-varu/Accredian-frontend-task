import { Box, Button } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <h1>Nothing to see here</h1>
        <p>page you are trying to open does not exist.</p>
        <Link to={"/"}>
          <Button variant="contained">Home</Button>
        </Link>
      </Box>
    </div>
  );
};

export default NotFound;
