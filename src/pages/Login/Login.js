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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../store/slice/token/tokenSlice";
import { getUser } from "../../store/slice/user/userSlice";

export const Login = () => {
  const [inputType, setInputType] = useState(false);
  const mail = useRef();
  const password = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:8080/login', {
      email: mail.current.value,
      password:  password.current.value
    }).then(res => {
      if(res.status === 200){
        localStorage.setItem("token", res.data.accessToken)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        dispatch(getToken(res.data.accessToken))
        dispatch(getUser(res.data.user))
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <Box sx={{ width: "525px", margin: "8% auto 0px" }}>
      <Typography
          sx={{
            color: "#3A4374",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "35px",
          }}
          component="h3"
        >
          Login
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
          Accaunt yoqmi ? <Link to='/register'>Register</Link>
        </Typography>
      <form onSubmit={handleFormSubmit} method='post'>
        <Stack spacing={2}>
          <TextField
            inputRef={mail}
            type="email"
            variant="outlined"
            label="Email address"
          />

          <TextField
            inputRef={password}
            type={inputType ? "text" : "password"}
            variant="outlined"
            label="Password"
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
