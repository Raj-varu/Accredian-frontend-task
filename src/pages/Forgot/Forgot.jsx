import Navbar from "../../components/navbar/navbar";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { validEmail, validPassword } from "../../utils/regex";
import { useState } from "react";
import { toast } from "react-toastify";
const Forgot = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [answerErr, setAnswerErr] = useState(false);
  const [answerErrMsg, setAnswerErrMsg] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState(false);
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState("");
  //setting up navigate
  const navigate = useNavigate();
  //Handel submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const answer = data.get("answer");
    const newPassword = data.get("newPassword");
    // console.log(newPassword);
    //Email validation
    if (validEmail.test(email)) {
      setEmailErr(false);
      setEmailErrMsg("");
      // console.log("email Pass");
    } else {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email");
    }
    if (validPassword.test(newPassword)) {
      setNewPasswordErr(false);
      setNewPasswordErrMsg("");
      // console.log("password Pass");
    } else {
      setNewPasswordErr(true);
      setNewPasswordErrMsg("Invalid Password atleast 8 charecter");
    }
    //Password validation
    if (answer) {
      setAnswerErr(false);
      setAnswerErrMsg("");
      // console.log("password Pass");
    } else {
      setAnswerErr(true);
      setAnswerErrMsg("answer is required");
    }
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/forgot", {
        email,
        answer,
        newPassword,
      });

      if (res && res.data.success) {
        // console.log("Password Changed :", res.data);
        toast.success("Passwored Changed", {
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
        // Perform any additional actions upon successful login
      } else {
        // console.error(
        //   "Login failed:",
        //   res && res.data ? res.data.error : "Unknown error"
        // );
        // console.log(res.data.message);
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

        // You may want to handle specific error cases here
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
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
        <div className="forgot-form-section">
          <Box className="forgot-form">
            <Typography>Lost Password 😱</Typography>
            <br />
            <Typography variant="h4" style={{ fontSize: "20px" }}>
              Reset !!!!
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
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ display: "block" }}
              />
              <TextField
                error={newPasswordErr}
                helperText={newPasswordErrMsg}
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="newPassword"
                type="password"
                id="newPassword"
                autoComplete="newPassword"
                style={{ display: "block" }}
              />
              <p>What is your favariout fruit</p>
              <TextField
                error={answerErr}
                helperText={answerErrMsg}
                margin="normal"
                required
                fullWidth
                name="answer"
                label="answer"
                type="answer"
                id="answer"
                autoComplete="answer"
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

export default Forgot;
