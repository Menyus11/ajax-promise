import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function App() {

  const [comments, setComments] = useState({});

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
                <div className='bg-warning rounded p-3' onClick={() => { document.getElementById('toggleDiv' + idNow).classList.remove('d-none') }}>
                  <p>{idNow}</p>
                  <h3>{commentsItem.title}</h3>
                  <p>{commentsItem.body}</p>
                   {comments[0].filter(userItems => userItems.id === commentsItem.userId)
                  .map((userItems, userIndex) => {
                   
                      return <React.Fragment key={userIndex}>
                        <b className='postAuthor'>{userItems.name}</b>
                        <small id={'small'+idNow}></small>
                        <div id={'toggleDiv' + idNow} className='mt-3 d-none'>
                          <ul>
                            <li>username: {userItems.username}</li>
                            <li>email: {userItems.email}</li>
                            <li>phone: {userItems.phone}</li>
                            <li>website: {userItems.website}</li>
                            <li>company: {userItems.company.name}, motto: {userItems.company.catchPhrase}</li>
                            <li>address: {userItems.address.zipcode} {userItems.address.city} {userItems.address.street} {userItems.address.suite}</li>
                          </ul>

                          <p>comments:</p>
                          <ul>{comments[2].filter(postItem => idNow === postItem.postId)
                          .map((postItem, postIndex) => {
                            
                              return <React.Fragment key={postIndex}>
                                <li>{postItem.body}</li>
                              </React.Fragment>
                            
                          })}</ul>
                          <button className='form-control btn btn-danger'
                            onClick={() => {
                              setTimeout(() => {
                                document.getElementById('toggleDiv' + idNow).classList.add('d-none')
                              }, 300);
                              
                            }}>
                            Összecsukás</button>
                        </div>
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

  setTimeout(() => {
    let usersPost = 0;
    document.querySelectorAll('.postAuthor').forEach( (element, index) => {
      let postIdNow = index + 1;
      
      document.querySelectorAll('.postAuthor').forEach( e => {
        if(e.innerText === element.innerText) {
          usersPost++;
           document.getElementById(`small`+postIdNow).innerHTML = (` (${usersPost} poszt)`);
        }
      })

      usersPost = 0;
      })
  }, 300);

}

export default App;
