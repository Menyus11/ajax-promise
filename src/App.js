import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function App() {

  const [comments, setComments] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
    ]).then(async res => {

      const a = await res[0].json()
      const b = await res[1].json()

      return [a, b]

    }).then(res => {
      setComments(res);
    })
  }, [])

/*   console.log(comments[1]);
  console.log(comments[0]); */

  if (comments.length > 0) {
    return (
      <div className='container bg-warning p-5 rounded'>
        {
          comments[1].map((item, index) => {
            return <React.Fragment key={index}>
              <div onClick={() => { console.log("kattintás") }}>
                <p>{item.id}</p>
                <h3>{item.title}</h3>
                <small>Szerző: <b className='authorClass' id={'author_'+index}>{item.userId}</b></small>
                <hr />
              </div>
            </React.Fragment>
          })
        }
      </div>
    );
  }
    const authorName = () => {
      comments[0].map( (item, index) => {
        console.log(item);
      })
/*       document.querySelectorAll('.authorClass').forEach( (e) => {

      }) */
      authorName();
    }

}

export default App;
