import { useState } from 'react';
import React from 'react';

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

export default ListItem;