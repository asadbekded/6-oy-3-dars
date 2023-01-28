import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/Modal/Modal";
import { getPosts } from "../../store/slice/posts/postsSlice";
import axios from "axios";
import { Card } from "../../components/Card/Card";

export const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(user.id));
  }, [dispatch, user.id]);

  const posts = useSelector((state) => state.posts.data);

  const [modal, setModal] = useState(false);
  const postRef = useRef();
  const bodyRef = useRef();
  const date = new Date();
  const mode = useSelector((state) => state.mode.mode);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setModal(false);
    axios
      .post("http://localhost:8080/posts", {
        post_title: postRef.current.value,
        post_body: bodyRef.current.value,
        user_id: user.id,
        user_name: user.first_name + " " + user.last_name,
        time:
          date.toLocaleDateString() +
          " " +
          date.toLocaleTimeString().substring(0, 5),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <div
            style={{ color: mode ? "#fff" : "#333" }}
            className="w-25 shadow p-3 mt-3"
          >
            <h4>
              {user.first_name} {user.last_name}
            </h4>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>

          <button onClick={() => setModal(true)} className="btn btn-primary">
            Create Post +
          </button>
        </div>

        <ul className="p-o list-unstyled w-75 mt-4">
          {posts.map((el) => (<Card key={el.id} el={el}/>))}
        </ul>
      </div>

      {modal ? (
        <Modal modal={modal} setModal={setModal} title={"POST"}>
          <form onSubmit={handleSubmit}>
            <input
              ref={postRef}
              className="form-control mb-2"
              type="text"
              placeholder="Post title"
            />
            <input
              ref={bodyRef}
              className="form-control mb-2"
              type="text"
              placeholder="Post Text"
            />
            <div className="d-flex align-items-center ">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => setModal(false)}
              >
                Exit
              </button>
              <button className="btn btn-success ms-3" type="submit">
                Send
              </button>
            </div>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
