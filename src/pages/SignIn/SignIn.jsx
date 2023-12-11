import "./SignIn.css";
import Navbar from "../../components/navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { validEmail, validPassword } from "../../utils/regex";
import { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  //setting up navigate
  const navigate = useNavigate();
  //Handel submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    //Email validation
    if (validEmail.test(data.get("email"))) {
      setEmailErr(false);
      setEmailErrMsg("");
      // console.log("email Pass");
    } else {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email");
    }
    //Password validation
    if (validPassword.test(data.get("password"))) {
      setPasswordErr(false);
      setPasswordErrMsg("");
      // console.log("password Pass");
    } else {
      setPasswordErr(true);
      setPasswordErrMsg("Wrong Password");
      // console.log(data.get("password"));
    }
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        // console.log("Login successful:", res.data);
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        //if we want to implement privatre route
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home");
        // Perform any additional actions upon successful login
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // console.error("Server error:", error.response.data.message);
        // console.error("Server error:", error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }

    //Remember me localStorage
  };
  //return function
  return (
    <Box>
      <Navbar />
      <Box display={"flex"} sx={{ width: "100vw" }}>
        <div className="image-section">
          <img src="sideImg.png" alt="backgroundimage" />
        </div>
        <div className="login-form-section">
          <Box className="login-form">
            <Typography>Welcome back! 👋</Typography>
            <br />
            <Typography variant="h4" style={{ fontSize: "20px" }}>
              Login to your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                error={emailErr}
                helperText={emailErrMsg}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ display: "block" }}
              />
              <TextField
                error={passwordErr}
                helperText={passwordErrMsg}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ display: "block" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/forgot"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/signup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default SignIn;
