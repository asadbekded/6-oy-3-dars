import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../store/slice/userPosts/userPostsSlice';

export const Posts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserPosts());
    }, [dispatch]);

    const posts = useSelector((state) => state.userPosts.data);
    const mode = useSelector((state) => state.mode.mode);

  return (
    <div style={{with:'100%'}}>
        <ul className="d-flex align-items-center justify-content-between flex-wrap p-0 list-unstyled mt-4">
          {
          posts.map(el => (
            <li style={{with:'100%', maxWidth: '430px', backgroundColor: mode ? '#222' : '#fff', color: mode? '#fff' : '#333'}}  className="mb-3 shadow p-3 rounded" key={el.id}>
              <h4>{el.post_title}</h4>
              <p>Name:  {el.user_name}</p>
              <p>{el.post_body}</p>
              <time className='d-block' dateTime={el.time}>Time: {el.time}</time>
              <Link to='/posts'>Learn more</Link>
            </li>
          ))
          }
        </ul>
    </div>
  )
}
