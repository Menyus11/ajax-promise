import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function ListItem(props) {
  const [visible, setVisible] = useState(false);

  return <React.Fragment>
    <div className='bg-warning rounded p-3 maindiv' onClick={() => { setVisible(true) }}>
      <p>{props.idNow}</p>
      <h3>{props.commentsItem.title}</h3>
      <p>{props.commentsItem.body}</p>
      {props.comments[0].filter(userItems => userItems.id === props.commentsItem.userId)

        .map((userItems, userIndex) => {

          return <React.Fragment key={userIndex}>
            <b className='postAuthor'>{userItems.name}</b>
            <small>, posztjai száma: <b>{props.postAll.filter(post => post.userId === userItems.id).length}</b></small>

            {visible && (

              <div className='mt-3'>
                <ul>
                  <li>username: {userItems.username}</li>
                  <li>email: {userItems.email}</li>
                  <li>phone: {userItems.phone}</li>
                  <li>website: {userItems.website}</li>
                  <li>company: {userItems.company.name}, motto: {userItems.company.catchPhrase}</li>
                  <li>address: {userItems.address.zipcode} {userItems.address.city} {userItems.address.street} {userItems.address.suite}</li>
                </ul>

                <p>comments:</p>
                <ul>{props.comments[2].filter(postItem => props.idNow === postItem.postId)
                  .map((postItem, postIndex) => {

                    return <React.Fragment key={postIndex}>
                      <li>{postItem.body}</li>
                    </React.Fragment>

                  })}</ul>

                <button className='btn btn-danger form-control'
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                  }}>
                  Összecsukás</button>
              </div>
            )}

          </React.Fragment>
        })}
    </div>
    <hr />
  </React.Fragment>
}

function App({ setVisible }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ]).then(async res => {

      const a = await res[0].json()
      const b = await res[1].json()
      const c = await res[2].json()

      return [a, b, c]

    }).then(res => {
      setComments(res);
    })
  }, [])

  if (comments.length > 0) {

    return (
      <div className='container bg-success p-5 rounded'>
        {
          comments[1].map((commentsItem, commentIndex) => {

            return (
              <React.Fragment key={commentIndex}>
                <ListItem postAll={comments[1]} comments={comments} idNow={commentsItem.id} commentsItem={commentsItem} />
              </React.Fragment>)

          })
        }
      </div>
    );
  }
}

export default App;

