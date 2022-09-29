import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function ListItem(props) {
   const [visible, setVisible] = useState(true);

  return <React.Fragment>
    {visible &&
      <div >
        <ul>
          <li>username: {props.userItems.username}</li>
          <li>email: {props.userItems.email}</li>
          <li>phone: {props.userItems.phone}</li>
          <li>website: {props.userItems.website}</li>
          <li>company: {props.userItems.company.name}, motto: {props.userItems.company.catchPhrase}</li>
          <li>address: {props.userItems.address.zipcode} {props.userItems.address.city} {props.userItems.address.street} {props.userItems.address.suite}</li>
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
      </div>}

  </React.Fragment>
}


function App({setVisible}) {

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
            const idNow = commentsItem.id;
            return (
              <React.Fragment key={commentIndex}>
                <div className='bg-warning rounded p-3 maindiv' onClick={() => { /* setVisible(true) */ }}>
                  <p>{idNow}</p>
                  <h3>{commentsItem.title}</h3>
                  <p>{commentsItem.body}</p>
                  {comments[0].filter(userItems => userItems.id === commentsItem.userId)

                    .map((userItems, userIndex) => {

                      return <React.Fragment key={userIndex}>
                        <b className='postAuthor'>{userItems.name}</b>
                        <small id={'small' + idNow}></small>

                        <ListItem userItems={userItems} comments={comments} idNow={idNow}/>

                      </React.Fragment>

                    })}
                </div>
                <hr />
              </React.Fragment>)

          })
        }
      </div>
    );

  }

  /*     setTimeout(() => {
        let usersPost = 0;
        document.querySelectorAll('.postAuthor').forEach((element, index) => {
          let postIdNow = index + 1;
    
          document.querySelectorAll('.postAuthor').forEach(e => {
            if (e.innerText === element.innerText) {
              usersPost++;
              document.getElementById(`small` + postIdNow).innerHTML = (` (${usersPost} poszt)`);
            }
          })
    
          usersPost = 0;
        })
      }, 300); */

}

export default App;

