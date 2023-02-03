import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/scale.css";
import ReactModal from "react-modal";

export const Card = ({ el }) => {
  const mode = useSelector((state) => state.mode.mode);
  const user = useSelector((state) => state.user.user);
  const [editModal, setEditModal] = useState(false);
  const date = new Date();

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8080/posts/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const postRef = useRef();
  const bodyRef = useRef();

  const handleEdit = (evt) => {
    evt.preventDefault();
    setEditModal(false);
    axios.put("http://localhost:8080/posts/" + el.id, {
      post_title: postRef.current.value,
      post_body: bodyRef.current.value,
      user_id: user.id,
      user_name: user.first_name + " " + user.last_name,
      time:
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString().substring(0, 5),
    });
  };

  return (
    <>
      <li
        style={{ color: mode ? "#fff" : "#333" }}
        className="mb-3 shadow p-3"
        key={el.id}
      >
        <h4>{el.post_title}</h4>
        <p>{el.post_body}</p>
        <Tippy
          content="Delete post"
          theme="light-border"
          placement="bottom"
          animation="scale"
          duration={600}
        >
          <button style={{ border: "none", backgroundColor: "transparent" }}>
            <AiFillDelete
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(el.id)}
              color="red"
              size="25px"
            />
          </button>
        </Tippy>
        <Tippy content='Edit post' theme="light-border" placement="bottom" animation='scale' duration={600}>
          <button style={{ border: "none", backgroundColor: "transparent" }}>
            <MdEdit
              style={{ cursor: "pointer" }}
              className="ms-3"
              onClick={() => setEditModal(true)}
              color="orange"
              size="25px"
            />
          </button>
        </Tippy>
      </li>
      {editModal ? (
        <ReactModal
          isOpen={editModal}
          onRequestClose={() => setEditModal(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
            content: {
              width: "50%",
              height: "35%",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              margin: "auto",
            },
          }}
        >
          <h3>Edit Post</h3>
          <form onSubmit={handleEdit}>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Post title"
              defaultValue={el.post_title}
              ref={postRef}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Post Text"
              defaultValue={el.post_body}
              ref={bodyRef}
            />
            <div className="d-flex align-items-center ">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => setEditModal(false)}
              >
                Exit
              </button>
              <button className="btn btn-success ms-3" type="submit">
                Send
              </button>
            </div>
          </form>
        </ReactModal>
      ) : (
        ""
      )}
    </>
  );
};
