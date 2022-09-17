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

            return (
              <React.Fragment key={commentIndex}>
                <div className='bg-warning rounded p-3' onClick={() => { document.getElementById('toggleDiv' + commentsItem.id).classList.remove('d-none') }}>
                  <p>{commentsItem.id}</p>
                  <h3>{commentsItem.title}</h3>
                  <p>{commentsItem.body}</p>
                  <small>Szerző: </small>{comments[0].map((userItems, userIndex) => {
                    if (userItems.id === commentsItem.userId) {
                      return <React.Fragment key={userIndex}>
                        <b>{userItems.name}</b>
                        <div id={'toggleDiv' + commentsItem.id} className='mt-3 displayToggle d-none'>
                          <ul>
                            <li>username: {userItems.username}</li>
                            <li>email: {userItems.email}</li>
                            <li>phone: {userItems.phone}</li>
                            <li>website: {userItems.website}</li>
                            <li>company: {userItems.company.name}, motto: {userItems.company.catchPhrase}</li>
                            <li>address: {userItems.address.zipcode} {userItems.address.city} {userItems.address.street} {userItems.address.suite}</li>
                          </ul>

                          <p>comments:</p>
                          <ul>{comments[2].map((postItem, postIndex) => {
                            if (commentsItem.id === postItem.postId) {
                              return <React.Fragment key={postIndex}>
                                <li>{postItem.body}</li>
                              </React.Fragment>
                            }
                          })}</ul>
                          <button className='form-control btn btn-danger'
                            onClick={() => {
                              document.getElementById('toggleDiv' + commentsItem.id).classList.add('d-none', 'valami')
                            }}>
                            Összecsukás</button>
                        </div>
                      </React.Fragment>


                    }
                  })}

                </div>
                <hr />
              </React.Fragment>)



          })
        }
      </div>
    );

  }

}

export default App;
