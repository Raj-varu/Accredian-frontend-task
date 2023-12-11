import { Box, Button } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";
const Home = () => {
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
        <h1>SignIn Success</h1>
        <p>public route!</p>
        <Link to={"/"}>
          <Button variant="contained">Home</Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
