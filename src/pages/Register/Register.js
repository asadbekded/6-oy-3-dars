import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../store/slice/token/tokenSlice";
import { getUser } from "../../store/slice/user/userSlice";

export const Register = () => {
  const [inputType, setInputType] = useState(false);
  const first_ref = useRef();
  const last_ref = useRef();
  const mail = useRef();
  const password = useRef();
  const dispatch = useDispatch()

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:8080/register', {
      first_name: first_ref.current.value,
      last_name: last_ref.current.value,
      email: mail.current.value,
      password:  password.current.value
    }).then(res => {
      if(res.status === 201){
        localStorage.setItem("token", res.data.accessToken)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        dispatch(getToken(res.data.accessToken))
        dispatch(getUser(res.data.user))
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <Box sx={{ width: "525px", margin: "5% auto 0px" }}>
      <Typography
          sx={{
            color: "#3A4374",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "35px",
          }}
          component="h3"
        >
          Register
        </Typography>
        <Typography
          sx={{
            marginBottom: "20px",
            color: "#647196",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "22px",
          }}
          component="p"
        >
          Accaunt bormi ? <Link to='/login'>Login</Link>
        </Typography>
      <form onSubmit={handleFormSubmit} method='post'>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="First name"
            type="text"
            inputRef={first_ref}
          />
          <TextField
            type="text"
            variant="outlined"
            label="Last name"
            inputRef={last_ref}
          />
          <TextField
            type="email"
            variant="outlined"
            label="Email address"
            inputRef={mail}
          />

          <TextField
            type={inputType ? "text" : "password"}
            variant="outlined"
            label="Password"
            inputRef={password}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setInputType(!inputType)}
                >
                  {inputType ? (
                    <VisibilityIcon cursor="pointer" />
                  ) : (
                    <VisibilityOffIcon cursor="pointer" />
                  )}{" "}
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" size="large" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
