import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import ListItem from './componens';

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

