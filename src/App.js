import { useDispatch, useSelector } from "react-redux";
import { Private } from "./apps/Private";
import { Public } from "./apps/Public";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect } from "react";
import { getToken } from "./store/slice/token/tokenSlice";
import { getUser } from "./store/slice/user/userSlice";
import { IdleTime } from "./components/IdleTime/IdleTime";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);

  useEffect(() => {
    dispatch(getToken(localStorage.getItem("token")));
    dispatch(getUser(JSON.parse(localStorage.getItem("user"))));
  }, [dispatch]);

  const token = useSelector((state) => state.token.token);

  if (token) {
    return (
      <div style={{ backgroundColor: mode ? "#333" : "#fff" }}>
        <Private /> 
        <IdleTime></IdleTime>
      </div>
    );
  } else {
    return <Public />;
  }
}

export default App;
