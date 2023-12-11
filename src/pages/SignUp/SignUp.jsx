import Navbar from "../../components/navbar/navbar";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { validEmail, validPassword } from "../../utils/regex";
import { useState } from "react";
import { toast } from "react-toastify";
const SignUp = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [confPasswordErr, setConfPasswordErr] = useState(false);
  const [confPasswordErrMsg, setConfPasswordErrMsg] = useState("");
  const [answerErr, setAnswerErr] = useState(false);
  const [answerErrMsg, setAnswerErrMsg] = useState("");

  //setting up navigate
  const navigate = useNavigate();
  //Handel submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("Confirm Password");
    const answer = data.get("answer");
    //Email validation
    if (validEmail.test(email)) {
      setEmailErr(false);
      setEmailErrMsg("");
      // console.log("email Pass");
    } else {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email");
    }
    //Password validation
    if (validPassword.test(password)) {
      setPasswordErr(false);
      setPasswordErrMsg("");
      // console.log("password Pass");
    } else {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password atleast 8 charecter");
    }
    if (validPassword.test(confirmPassword)) {
      setConfPasswordErr(false);
      setConfPasswordErrMsg("");
      // console.log("password Pass");
    } else {
      setConfPasswordErr(true);
      setConfPasswordErrMsg("Invalid Password atleast 8 charecter");
    }

    if (password !== confirmPassword) {
      toast.error("Password Not matched", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setConfPasswordErr(true);
      setPasswordErr(true);
      setConfPasswordErrMsg("Password does't match");
      setPasswordErrMsg("Password does't match");
    }
    // console.log(answer);
    if (answer) {
      setAnswerErr(false);
      setAnswerErrMsg("");
      // console.log("password Pass");
    } else {
      setAnswerErr(true);
      setAnswerErrMsg("answer is required");
    }

    //hitting register api
    if (password === confirmPassword) {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          {
            email,
            password,
            name,
            answer,
          }
        );

        if (res && res.data.success) {
          toast.success("Registerd successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
          //backup additional handler
        } else {
          // console.error(
          //   "Login failed:"
          // );
          toast.error("Unknown Error", {
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
    }
  };

  return (
    <Box>
      <Navbar />
      <Box display={"flex"} sx={{ width: "100vw" }}>
        <div className="image-section">
          <img src="sideImg.png" alt="backgroundimage" />
        </div>
        <div className="signup-form-section">
          <Box className="signup-form">
            <Typography variant="h4" style={{ fontSize: "20px" }}>
              Register new
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                style={{ display: "block" }}
              />
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
              <TextField
                error={confPasswordErr}
                helperText={confPasswordErrMsg}
                margin="normal"
                required
                fullWidth
                name="Confirm Password"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                autoComplete="current-password"
                style={{ display: "block" }}
              />
              <p>What is your favariout fruit</p>
              <TextField
                error={answerErr}
                helperText={answerErrMsg}
                margin="normal"
                required
                fullWidth
                id="answer"
                label="answer"
                name="answer"
                autoComplete="answer"
                autoFocus
                style={{ display: "block" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/"} variant="body2">
                    {"Have an account? Sign In"}
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

export default SignUp;
