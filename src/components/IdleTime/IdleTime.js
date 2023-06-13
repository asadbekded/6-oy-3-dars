import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../store/slice/token/tokenSlice";
import { removeUser } from "../../store/slice/user/userSlice";

export const IdleTime = () => {
  const timeRef = useRef();
  const timeOutRef = useRef();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logOut = () => {
    setModal(true);
    timeOutRef.current = setTimeout(userLogOut, 10000)
  };

  const userLogOut = () => {
    navigate('/')
    dispatch(removeToken(localStorage.removeItem("token")));
    dispatch(removeUser(JSON.parse(localStorage.removeItem("user"))));
    clearTimeout(timeOutRef.current)
    setModal(false);
  }

  const stayUser = () => {
    setModal(false);
    clearTimeout(timeOutRef.current)
  }

  return (
    <div>
      <IdleTimer ref={timeRef} timeout={5000} onIdle={logOut}></IdleTimer>

      <ReactModal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          content: {
            width: "30%",
            height: "22%",
            top: "0",
            left: "0",  
            right: "0",
            bottom: "0",
            margin: "auto",
          },
        }}
      >
        <h3 className="mb-3">Saytdan chiqasizmi ❓</h3>
        <button onClick={userLogOut} className="btn btn-primary">Chiqish</button>
        <button onClick={stayUser} className="btn btn-primary ms-3">Yoq</button>
      </ReactModal>
    </div>
  );
};
